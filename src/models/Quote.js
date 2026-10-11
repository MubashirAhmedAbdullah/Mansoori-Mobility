import { model, models, Schema } from "mongoose";
const QuoteSchema = new Schema({
    reference: { type: String, required: true, unique: true, index: true },
    load: { type: Schema.Types.ObjectId, ref: "Load", required: true, index: true },
    carrier: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    vehicleCandidate: { type: Schema.Types.ObjectId, ref: "Vehicle" },
    pricePaisa: { type: Number, required: true, min: 1 },
    currency: { type: String, enum: ["PKR"], default: "PKR" },
    message: { type: String, trim: true, maxlength: 1200 },
    expiresAt: { type: Date, required: true, index: true },
    status: { type: String, enum: ["pending", "accepted", "rejected", "expired", "withdrawn"], default: "pending", index: true },
    termsSnapshot: { type: Schema.Types.Mixed, default: {} },
}, { timestamps: true, versionKey: false });
QuoteSchema.index({ load: 1, carrier: 1, status: 1 });
// The accept endpoint also uses a transaction and state check; this index is a final guard
// against two accepted quotes for the same load.
QuoteSchema.index({ load: 1, status: 1 }, { unique: true, partialFilterExpression: { status: "accepted" } });
export default models.Quote ?? model("Quote", QuoteSchema);
