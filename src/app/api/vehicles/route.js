import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession, hasRole } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Vehicle from "@/models/Vehicle";
const VehicleInputSchema = z.object({
    mode: z.enum(["freight", "rental", "both"]),
    category: z.string().trim().min(2).max(100),
    make: z.string().trim().max(100).optional(),
    modelName: z.string().trim().max(100).optional(),
    year: z.number().int().min(1950).max(2100).optional(),
    seats: z.number().int().min(1).max(80).optional(),
    capacityKg: z.number().nonnegative().max(1_000_000).optional(),
    transmission: z.enum(["automatic", "manual", "not_applicable"]).optional(),
    dailyRatePaisa: z.number().int().nonnegative().max(10_000_000_000).optional(),
    serviceAreas: z.array(z.string().trim().min(2).max(100)).max(50).default([]),
});
export async function GET(request) {
    try {
        await connectToDatabase();
        const { searchParams } = new URL(request.url);
        const mode = searchParams.get("mode");
        const query = { status: "published" };
        if (mode && ["freight", "rental", "both"].includes(mode))
            query.mode = mode;
        const vehicles = await Vehicle.find(query).select("mode category make modelName year seats capacityKg transmission publicPhotos dailyRatePaisa serviceAreas verificationStatus status").sort({ createdAt: -1 }).limit(100).lean();
        return NextResponse.json({ vehicles });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unable to load vehicles.";
        const noDb = message.includes("MONGODB_URI") || message.includes("Database is not configured");
        return NextResponse.json({ error: noDb ? message : "Unable to load vehicles." }, { status: noDb ? 503 : 500 });
    }
}
export async function POST(request) {
    try {
        const session = await getSession();
        if (!session)
            return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
        if (!hasRole(session, ["carrier", "host"]))
            return NextResponse.json({ error: "A transport-owner or rental-host role is required." }, { status: 403 });
        const parsed = VehicleInputSchema.safeParse(await request.json());
        if (!parsed.success)
            return NextResponse.json({ error: "Please review the vehicle details.", details: parsed.error.flatten().fieldErrors }, { status: 400 });
        await connectToDatabase();
        const vehicle = await Vehicle.create({ owner: session.userId, ...parsed.data, status: "pending_review", verificationStatus: "pending" });
        return NextResponse.json({ vehicle: { id: vehicle.id, status: vehicle.status, verificationStatus: vehicle.verificationStatus } }, { status: 201 });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unable to register vehicle.";
        const noDb = message.includes("MONGODB_URI") || message.includes("Database is not configured");
        return NextResponse.json({ error: noDb ? message : "Unable to register vehicle." }, { status: noDb ? 503 : 500 });
    }
}
