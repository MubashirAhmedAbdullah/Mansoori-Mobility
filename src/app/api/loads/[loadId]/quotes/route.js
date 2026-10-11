import { randomUUID } from "node:crypto";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession, hasRole } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Load from "@/models/Load";
import Quote from "@/models/Quote";
import User from "@/models/User";
import Vehicle from "@/models/Vehicle";
const QuoteInputSchema = z.object({
    pricePaisa: z.number().int().positive().max(100_000_000_000),
    message: z.string().trim().max(1200).optional(),
    expiresAt: z.string().datetime(),
    vehicleId: z.string().optional(),
});
export async function POST(request, context) {
    try {
        const session = await getSession();
        if (!session)
            return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
        if (!hasRole(session, ["carrier"]))
            return NextResponse.json({ error: "Only carrier accounts can submit freight quotes." }, { status: 403 });
        const { loadId } = await context.params;
        if (!isValidObjectId(loadId))
            return NextResponse.json({ error: "Load reference is invalid." }, { status: 400 });
        const parsed = QuoteInputSchema.safeParse(await request.json());
        if (!parsed.success)
            return NextResponse.json({ error: "Please review the quote details.", details: parsed.error.flatten().fieldErrors }, { status: 400 });
        const input = parsed.data;
        if (new Date(input.expiresAt).getTime() <= Date.now())
            return NextResponse.json({ error: "Quote expiry must be in the future." }, { status: 400 });
        await connectToDatabase();
        const [user, load] = await Promise.all([
            User.findById(session.userId).select("status verificationStatus roles").lean(),
            Load.findById(loadId),
        ]);
        if (!user || user.status !== "active" || user.verificationStatus !== "verified")
            return NextResponse.json({ error: "Carrier verification must be approved before quoting on paid work." }, { status: 403 });
        if (!load || !["posted", "quotes_open"].includes(load.status))
            return NextResponse.json({ error: "This load is no longer accepting quotes." }, { status: 404 });
        if (String(load.shipper) === session.userId)
            return NextResponse.json({ error: "You cannot quote on your own load." }, { status: 403 });
        let vehicleId;
        if (input.vehicleId) {
            if (!isValidObjectId(input.vehicleId))
                return NextResponse.json({ error: "Selected vehicle is invalid." }, { status: 400 });
            const vehicle = await Vehicle.findOne({ _id: input.vehicleId, owner: session.userId, status: "published", mode: { $in: ["freight", "both"] } }).select("_id").lean();
            if (!vehicle)
                return NextResponse.json({ error: "Select a published freight vehicle belonging to your account." }, { status: 400 });
            vehicleId = String(vehicle._id);
        }
        // Keep prior quote versions for an audit trail but allow a carrier to replace a pending quote.
        await Quote.updateMany({ load: load._id, carrier: session.userId, status: "pending" }, { $set: { status: "withdrawn" } });
        const quote = await Quote.create({
            reference: `QT-${randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase()}`,
            load: load._id,
            carrier: session.userId,
            vehicleCandidate: vehicleId,
            pricePaisa: input.pricePaisa,
            message: input.message,
            expiresAt: new Date(input.expiresAt),
            status: "pending",
            termsSnapshot: { currency: "PKR", vehicleId: vehicleId ?? null, expiresAt: input.expiresAt },
        });
        if (load.status === "posted") {
            load.status = "quotes_open";
            await load.save();
        }
        return NextResponse.json({ quote: { id: quote.id, reference: quote.reference, status: quote.status, expiresAt: quote.expiresAt } }, { status: 201 });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unable to submit quote.";
        const noDb = message.includes("MONGODB_URI") || message.includes("Database is not configured");
        return NextResponse.json({ error: noDb ? message : "Unable to submit quote." }, { status: noDb ? 503 : 500 });
    }
}
