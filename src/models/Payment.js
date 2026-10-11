import { model, models, Schema } from "mongoose";
const PaymentSchema = new Schema({
    booking: { type: Schema.Types.ObjectId, ref: "Booking", required: true, index: true },
    provider: { type: String, required: true },
    providerPaymentId: { type: String, index: true },
    idempotencyKey: { type: String, required: true, unique: true },
    amountPaisa: { type: Number, required: true, min: 0 },
    currency: { type: String, enum: ["PKR"], default: "PKR" },
    state: { type: String, enum: ["created", "requires_action", "authorized", "captured", "paid", "failed", "cancelled", "partially_refunded", "refunded", "chargeback"], default: "created", index: true },
    providerEventIds: [{ type: String }],
    attempts: { type: Number, default: 0 },
    failureReason: { type: String, maxlength: 1000 },
    lastProviderEventAt: { type: Date },
}, { timestamps: true, versionKey: false });
PaymentSchema.index({ provider: 1, providerPaymentId: 1 }, { unique: true, sparse: true });
export default models.Payment ?? model("Payment", PaymentSchema);
