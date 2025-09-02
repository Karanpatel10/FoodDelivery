import mongoose from "mongoose";

const promoSchema=new mongoose.Schema(
    {
        promocode:{type:String,required:true},
        userId:{type:String,required:true},
        email:{type:String,required:true},
        orderId:{type:String,required:true},
        usedAt:{type:Date,default:Date.now},

    }
)

promoSchema.index({ promocode: 1, userId: 1 }, { unique: true });

const promoModel=mongoose.models.promo || mongoose.model("promo",promoSchema);
export default promoModel;