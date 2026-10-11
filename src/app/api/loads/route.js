import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession, hasRole } from "@/lib/auth";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongodb";
import Load from "@/models/Load";
const LoadInputSchema = z.object({
    origin: z.string().trim().min(3).max(240),
    destination: z.string().trim().min(3).max(240),
    pickupAt: z.string().datetime(),
    cargoCategory: z.string().trim().min(2).max(100),
    cargoDescription: z.string().trim().max(1500).optional(),
    weightKg: z.number().nonnegative().max(1_000_000).optional(),
    packageCount: z.number().int().nonnegative().max(1_000_000).optional(),
    handlingNotes: z.string().trim().max(2000).optional(),
    vehicleRequirement: z.string().trim().min(2).max(100),
    pricingModel: z.enum(["quote", "fixed"]).default("quote"),
    fixedPricePaisa: z.number().int().nonnegative().max(100_000_000_000).optional(),
    publish: z.boolean().default(false),
});
export async function GET() {
    try {
        const session = await getSession();
        if (!session)
            return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
        if (!hasRole(session, ["carrier"]))
            return NextResponse.json({ error: "A carrier account is required." }, { status: 403 });
        await connectToDatabase();
        const user = await User.findById(session.userId).select("verificationStatus status").lean();
        if (!user || user.status !== "active" || user.verificationStatus !== "verified")
            return NextResponse.json({ error: "Carrier verification must be approved before viewing eligible load details." }, { status: 403 });
        const loads = await Load.find({ status: { $in: ["posted", "quotes_open"] } }).select("reference route cargo.category cargo.weightKg vehicleRequirement pricingModel fixedPricePaisa currency status createdAt").sort({ createdAt: -1 }).limit(100).lean();
        return NextResponse.json({ loads });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unable to load freight requests.";
        return NextResponse.json({ error: message.includes("MONGODB_URI") || message.includes("Database is not configured") ? message : "Unable to load freight requests." }, { status: message.includes("MONGODB_URI") || message.includes("Database is not configured") ? 503 : 500 });
    }
}
export async function POST(request) {
    try {
        const session = await getSession();
        if (!session)
            return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
        if (!hasRole(session, ["shipper"]))
            return NextResponse.json({ error: "Only goods-owner accounts can post loads." }, { status: 403 });
        const parsed = LoadInputSchema.safeParse(await request.json());
        if (!parsed.success)
            return NextResponse.json({ error: "Please review the shipment details.", details: parsed.error.flatten().fieldErrors }, { status: 400 });
        const input = parsed.data;
        if (input.pricingModel === "fixed" && (!input.fixedPricePaisa || input.fixedPricePaisa <= 0))
            return NextResponse.json({ error: "A positive fixed price is required for fixed-price loads." }, { status: 400 });
        if (new Date(input.pickupAt).getTime() <= Date.now())
            return NextResponse.json({ error: "Pickup time must be in the future." }, { status: 400 });
        await connectToDatabase();
        const load = await Load.create({
            shipper: session.userId,
            createdBy: session.userId,
            reference: `FR-${randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase()}`,
            route: { origin: input.origin, destination: input.destination, pickupAt: new Date(input.pickupAt) },
            cargo: { category: input.cargoCategory, description: input.cargoDescription, weightKg: input.weightKg, packageCount: input.packageCount, handlingNotes: input.handlingNotes },
            vehicleRequirement: input.vehicleRequirement,
            pricingModel: input.pricingModel,
            fixedPricePaisa: input.pricingModel === "fixed" ? input.fixedPricePaisa : undefined,
            status: input.publish ? "posted" : "draft",
        });
        return NextResponse.json({ load: { id: load.id, reference: load.reference, status: load.status } }, { status: 201 });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unable to create shipment.";
        const noDb = message.includes("MONGODB_URI") || message.includes("Database is not configured");
        return NextResponse.json({ error: noDb ? message : "Unable to create shipment." }, { status: noDb ? 503 : 500 });
    }
}
