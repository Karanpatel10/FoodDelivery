import promoModel from "../models/promoModels.js";
import promoMasterModel from "../models/promoMasterModel.js";

const promoValidator=async(req,res)=>{

    try{
            const {code}=req.body;
            const userId=req.user.userId;
            
            // Find the promo in master list
            const promo = await promoMasterModel.findOne({ code: code });
            if (!promo) return res.json({ success: false, message: "Invalid promo code" });

            // Check if user already used this promo
            const used = await promoModel.findOne({ promocode: code.toLowerCase(), userId });
            if (used)
            return res.json({ success: false, message: "Promo already used by you" });

            // Calculate discount
                let discount = 0; 
                if (promo.type === "flat") {
                discount = promo.value;
                }

                res.json({success:true,promo:{code:promo.code,type:promo.type,value:promo.value,discount}})

    }catch(error)
    {
        console.log(error);
        res.json({success:false,message:'Server error for code check'});
    }

}

export {promoValidator};