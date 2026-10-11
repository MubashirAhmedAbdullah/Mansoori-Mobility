import { model, models, Schema } from "mongoose";
const LedgerEntrySchema = new Schema({
    booking: { type: Schema.Types.ObjectId, ref: "Booking", required: true, index: true },
    category: { type: String, enum: ["customer_collection", "platform_commission", "provider_payable", "provider_payout", "refund", "adjustment", "reversal", "provider_fee", "tax"], required: true },
    direction: { type: String, enum: ["debit", "credit"], required: true },
    amountPaisa: { type: Number, required: true, min: 0 },
    currency: { type: String, enum: ["PKR"], default: "PKR" },
    sourceRef: { type: String, required: true, index: true },
    idempotencyKey: { type: String, required: true, unique: true },
    metadata: { type: Schema.Types.Mixed },
}, { timestamps: true, versionKey: false, strict: true });
LedgerEntrySchema.index({ booking: 1, createdAt: 1 });
export default models.LedgerEntry ?? model("LedgerEntry", LedgerEntrySchema);
