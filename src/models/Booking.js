import { model, models, Schema } from "mongoose";
const MilestoneSchema = new Schema({
    state: { type: String, required: true },
    actor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    at: { type: Date, default: Date.now },
    note: { type: String, maxlength: 1200 },
    evidenceReference: { type: String, maxlength: 500 },
    documentIds: [{ type: Schema.Types.ObjectId, ref: "Document" }],
}, { _id: false });
const BookingSchema = new Schema({
    reference: { type: String, required: true, unique: true, index: true },
    bookingType: { type: String, enum: ["freight", "rental"], required: true, index: true },
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    provider: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    load: { type: Schema.Types.ObjectId, ref: "Load" },
    quote: { type: Schema.Types.ObjectId, ref: "Quote" },
    vehicle: { type: Schema.Types.ObjectId, ref: "Vehicle" },
    state: { type: String, required: true, index: true },
    currency: { type: String, enum: ["PKR"], default: "PKR" },
    grossPaisa: { type: Number, min: 0, required: true },
    commissionBasisPoints: { type: Number, min: 0, max: 10000, required: true },
    commissionPaisa: { type: Number, min: 0, required: true },
    providerNetPaisa: { type: Number, min: 0, required: true },
    termsSnapshot: { type: Schema.Types.Mixed, required: true },
    milestones: { type: [MilestoneSchema], default: [] },
    disputeOpen: { type: Boolean, default: false, index: true },
    payoutState: { type: String, enum: ["not_eligible", "eligible_for_release", "release_requested", "payout_pending", "paid", "payout_failed", "held_for_dispute"], default: "not_eligible" },
}, { timestamps: true, versionKey: false });
BookingSchema.index({ customer: 1, state: 1, createdAt: -1 });
BookingSchema.index({ provider: 1, state: 1, createdAt: -1 });
BookingSchema.index({ load: 1 }, { unique: true, sparse: true });
export default models.Booking ?? model("Booking", BookingSchema);
