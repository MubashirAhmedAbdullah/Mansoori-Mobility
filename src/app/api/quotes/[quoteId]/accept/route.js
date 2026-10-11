import mongoose, { isValidObjectId } from "mongoose";
import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getSession, hasRole } from "@/lib/auth";
import { connectToDatabase } from "@/lib/mongodb";
import { calculateCommission } from "@/lib/money";
import Booking from "@/models/Booking";
import Load from "@/models/Load";
import Quote from "@/models/Quote";
export async function POST(_request, context) {
    const session = await getSession();
    if (!session)
        return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
    if (!hasRole(session, ["shipper"]))
        return NextResponse.json({ error: "Only the goods owner can accept a quote." }, { status: 403 });
    const { quoteId } = await context.params;
    if (!isValidObjectId(quoteId))
        return NextResponse.json({ error: "Quote reference is invalid." }, { status: 400 });
    const rateRaw = process.env.FREIGHT_COMMISSION_BPS;
    const commissionBasisPoints = Number(rateRaw);
    if (!rateRaw || !Number.isInteger(commissionBasisPoints) || commissionBasisPoints < 0 || commissionBasisPoints > 10_000) {
        return NextResponse.json({ error: "Freight commission policy is not configured. Set FREIGHT_COMMISSION_BPS after the commercial terms are approved." }, { status: 503 });
    }
    let dbSession;
    try {
        await connectToDatabase();
        const quoteBefore = await Quote.findById(quoteId).lean();
        if (!quoteBefore)
            return NextResponse.json({ error: "Quote was not found." }, { status: 404 });
        const loadBefore = await Load.findById(quoteBefore.load).select("shipper status route cargo vehicleRequirement").lean();
        if (!loadBefore || String(loadBefore.shipper) !== session.userId)
            return NextResponse.json({ error: "You cannot accept a quote for this load." }, { status: 403 });
        if (quoteBefore.status !== "pending" || new Date(quoteBefore.expiresAt).getTime() <= Date.now())
            return NextResponse.json({ error: "This quote is no longer available." }, { status: 409 });
        if (!["posted", "quotes_open"].includes(loadBefore.status))
            return NextResponse.json({ error: "This load already has a confirmed workflow." }, { status: 409 });
        const totals = calculateCommission(quoteBefore.pricePaisa, commissionBasisPoints);
        const reference = `FB-${randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase()}`;
        dbSession = await mongoose.startSession();
        let responseBooking = null;
        await dbSession.withTransaction(async () => {
            const quote = await Quote.findById(quoteId).session(dbSession);
            const load = await Load.findById(quoteBefore.load).session(dbSession);
            if (!quote || !load || String(load.shipper) !== session.userId || quote.status !== "pending" || !["posted", "quotes_open"].includes(load.status) || new Date(quote.expiresAt).getTime() <= Date.now()) {
                throw new Error("QUOTE_STATE_CONFLICT");
            }
            quote.status = "accepted";
            await quote.save({ session: dbSession });
            await Quote.updateMany({ load: load._id, _id: { $ne: quote._id }, status: "pending" }, { $set: { status: "rejected" } }, { session: dbSession });
            const [booking] = await Booking.create([{
                    reference,
                    bookingType: "freight",
                    customer: session.userId,
                    provider: quote.carrier,
                    load: load._id,
                    quote: quote._id,
                    vehicle: quote.vehicleCandidate,
                    state: "awaiting_payment",
                    currency: "PKR",
                    grossPaisa: totals.grossPaisa,
                    commissionBasisPoints,
                    commissionPaisa: totals.commissionPaisa,
                    providerNetPaisa: totals.providerNetPaisa,
                    termsSnapshot: {
                        route: load.route,
                        cargoCategory: load.cargo.category,
                        vehicleRequirement: load.vehicleRequirement,
                        quoteReference: quote.reference,
                        quotePricePaisa: quote.pricePaisa,
                        commissionBasisPoints,
                        commissionPaisa: totals.commissionPaisa,
                        providerNetPaisa: totals.providerNetPaisa,
                        currency: "PKR",
                        acceptedAt: new Date().toISOString(),
                    },
                    milestones: [{ state: "awaiting_payment", actor: session.userId, note: "Quote accepted; awaiting payment-provider confirmation." }],
                }], { session: dbSession });
            load.status = "booked";
            await load.save({ session: dbSession });
            responseBooking = { id: String(booking._id), reference: booking.reference, state: booking.state };
        });
        if (!responseBooking)
            return NextResponse.json({ error: "Quote acceptance could not be completed." }, { status: 500 });
        return NextResponse.json({ booking: responseBooking, nextStep: "Create and confirm checkout through the contracted payment provider." }, { status: 201 });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unable to accept quote.";
        const noDb = message.includes("MONGODB_URI") || message.includes("Database is not configured");
        const conflict = message === "QUOTE_STATE_CONFLICT" || error?.code === 11000;
        return NextResponse.json({ error: noDb ? message : conflict ? "This load or quote changed while you were accepting it. Refresh and try again." : "Unable to accept quote." }, { status: noDb ? 503 : conflict ? 409 : 500 });
    }
    finally {
        await dbSession?.endSession();
    }
}
