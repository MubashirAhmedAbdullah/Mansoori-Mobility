import { model, models, Schema } from "mongoose";
const VehicleSchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    organizationName: { type: String, trim: true },
    mode: { type: String, enum: ["freight", "rental", "both"], required: true, index: true },
    category: { type: String, required: true, trim: true, index: true },
    make: { type: String, trim: true },
    modelName: { type: String, trim: true },
    year: { type: Number, min: 1950, max: 2100 },
    seats: { type: Number, min: 1 },
    capacityKg: { type: Number, min: 0 },
    transmission: { type: String, enum: ["automatic", "manual", "not_applicable"] },
    publicPhotos: [{ type: String }],
    privateDocumentIds: [{ type: Schema.Types.ObjectId, ref: "Document" }],
    dailyRatePaisa: { type: Number, min: 0 },
    status: { type: String, enum: ["draft", "pending_review", "published", "unavailable", "maintenance", "rejected"], default: "draft", index: true },
    verificationStatus: { type: String, enum: ["not_started", "pending", "verified", "rejected", "expired"], default: "not_started" },
    serviceAreas: [{ type: String }],
}, { timestamps: true, versionKey: false });
VehicleSchema.index({ mode: 1, category: 1, status: 1 });
export default models.Vehicle ?? model("Vehicle", VehicleSchema);
