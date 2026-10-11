import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession, hasRole } from "@/lib/auth";
import { canTransitionFreight } from "@/lib/money";
import { connectToDatabase } from "@/lib/mongodb";
import Booking from "@/models/Booking";
const MilestoneSchema = z.object({
    nextState: z.enum(["pickup_in_progress", "in_transit", "delivered_pending_confirmation", "completed_settlement_pending", "disputed"]),
    note: z.string().trim().max(1200).optional(),
    evidenceReference: z.string().trim().min(3).max(500).optional(),
});
export async function PATCH(request, context) {
    try {
        const session = await getSession();
        if (!session)
            return NextResponse.json({ error: "Sign in is required." }, { status: 401 });
        const { bookingId } = await context.params;
        if (!isValidObjectId(bookingId))
            return NextResponse.json({ error: "Booking reference is invalid." }, { status: 400 });
        const parsed = MilestoneSchema.safeParse(await request.json());
        if (!parsed.success)
            return NextResponse.json({ error: "Please review the milestone details.", details: parsed.error.flatten().fieldErrors }, { status: 400 });
        const { nextState, note, evidenceReference } = parsed.data;
        await connectToDatabase();
        const booking = await Booking.findById(bookingId);
        if (!booking)
            return NextResponse.json({ error: "Booking was not found." }, { status: 404 });
        if (booking.bookingType !== "freight")
            return NextResponse.json({ error: "Use the rental lifecycle endpoint for car-rental bookings." }, { status: 400 });
        const isCustomer = String(booking.customer) === session.userId;
        const isProvider = String(booking.provider) === session.userId;
        if (!isCustomer && !isProvider)
            return NextResponse.json({ error: "You do not have access to this booking." }, { status: 403 });
        if (booking.disputeOpen && nextState !== "disputed")
            return NextResponse.json({ error: "This booking is held for dispute review." }, { status: 409 });
        if (["pickup_in_progress", "in_transit", "delivered_pending_confirmation"].includes(nextState) && (!isProvider || !hasRole(session, ["carrier", "driver"]))) {
            return NextResponse.json({ error: "Only the assigned provider or authorized driver can update delivery milestones." }, { status: 403 });
        }
        if (nextState === "completed_settlement_pending" && (!isCustomer || !hasRole(session, ["shipper"]))) {
            return NextResponse.json({ error: "Only the goods owner can confirm delivery for settlement eligibility." }, { status: 403 });
        }
        if (nextState === "disputed" && !hasRole(session, ["shipper", "carrier", "driver"])) {
            return NextResponse.json({ error: "Your role cannot open a freight dispute." }, { status: 403 });
        }
        if (["pickup_in_progress", "delivered_pending_confirmation"].includes(nextState) && !evidenceReference) {
            return NextResponse.json({ error: "Evidence reference is required for pickup and proof-of-delivery milestones." }, { status: 400 });
        }
        const current = booking.state;
        if (!canTransitionFreight(current, nextState))
            return NextResponse.json({ error: `Transition from ${current} to ${nextState} is not allowed.` }, { status: 409 });
        if (nextState === "completed_settlement_pending" && booking.disputeOpen)
            return NextResponse.json({ error: "A disputed booking cannot become payout-eligible until the dispute is resolved." }, { status: 409 });
        booking.state = nextState;
        booking.milestones.push({ state: nextState, actor: session.userId, at: new Date(), note, evidenceReference });
        if (nextState === "disputed") {
            booking.disputeOpen = true;
            booking.payoutState = "held_for_dispute";
        }
        if (nextState === "completed_settlement_pending") {
            booking.payoutState = "eligible_for_release";
        }
        await booking.save();
        return NextResponse.json({ booking: { id: booking.id, reference: booking.reference, state: booking.state, disputeOpen: booking.disputeOpen, payoutState: booking.payoutState }, message: nextState === "completed_settlement_pending" ? "Completion recorded. This only marks the booking eligible for the contracted provider payout workflow; it does not transfer money." : "Booking milestone recorded." });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Unable to update booking milestone.";
        const noDb = message.includes("MONGODB_URI") || message.includes("Database is not configured");
        return NextResponse.json({ error: noDb ? message : "Unable to update booking milestone." }, { status: noDb ? 503 : 500 });
    }
}
