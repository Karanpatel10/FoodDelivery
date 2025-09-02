import mongoose from "mongoose";

const promoMasterSchema=new mongoose.Schema(
    {
        code: { type: String, required: true, unique: true },
        type: { type: String, enum: ["percentage", "flat"], default: "percentage" },
        value: { type: Number, required: true },  // discount value
        minOrder: { type: Number, default: 0 },
        maxDiscount: { type: Number },            // optional cap
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        usageLimit: { type: Number, default: 1 }, // per user
    }
)

const promoMasterModel=mongoose.models.promoMaster||mongoose.model("promoMaster",promoMasterSchema);
export default promoMasterModel;