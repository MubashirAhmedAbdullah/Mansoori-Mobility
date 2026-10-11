import { model, models, Schema } from "mongoose";
const UserSchema = new Schema({
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, lowercase: true, trim: true, unique: true, index: true },
    phone: { type: String, trim: true, maxlength: 30 },
    passwordHash: { type: String, required: true, select: false },
    roles: { type: [String], enum: ["shipper", "carrier", "driver", "host"], default: ["shipper"], required: true },
    status: { type: String, enum: ["active", "restricted", "disabled"], default: "active", index: true },
    verificationStatus: { type: String, enum: ["not_started", "pending", "verified", "rejected", "expired"], default: "not_started" },
    emailVerifiedAt: { type: Date, default: null },
    lastLoginAt: { type: Date, default: null },
}, { timestamps: true, versionKey: false });
export default models.User ?? model("User", UserSchema);
