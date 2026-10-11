import { model, models, Schema } from "mongoose";
const LoadSchema = new Schema({
    shipper: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    reference: { type: String, required: true, unique: true, index: true },
    route: {
        origin: { type: String, required: true, trim: true, maxlength: 240 },
        destination: { type: String, required: true, trim: true, maxlength: 240 },
        pickupAt: { type: Date, required: true },
    },
    cargo: { category: { type: String, required: true, trim: true }, description: { type: String, trim: true, maxlength: 1500 }, weightKg: { type: Number, min: 0 }, packageCount: { type: Number, min: 0 }, handlingNotes: { type: String, maxlength: 2000 } },
    vehicleRequirement: { type: String, required: true },
    pricingModel: { type: String, enum: ["quote", "fixed"], default: "quote" },
    fixedPricePaisa: { type: Number, min: 0 },
    currency: { type: String, enum: ["PKR"], default: "PKR" },
    status: { type: String, enum: ["draft", "posted", "quotes_open", "booked", "in_transit", "delivered", "disputed", "cancelled"], default: "draft", index: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true, versionKey: false });
LoadSchema.index({ status: 1, "route.pickupAt": 1, vehicleRequirement: 1 });
export default models.Load ?? model("Load", LoadSchema);
