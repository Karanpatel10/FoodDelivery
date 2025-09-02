import orderModel from "../models/OrderModels.js";
import userModel from "../models/userModels.js";
import Stripe from "stripe"
import sendEmail from "../utils/sendEmail.js";
import { orderConfirmationEmail } from "../utils/emailTemplate.js";
import promoModel from "../models/promoModels.js";

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

// Count order total

const countorder=async(req,res)=>{
    try{
        const o_count=await orderModel.countDocuments();
        res.json({success:true,o_count});

    }catch(error)
    {
        console.log(error);
        res.json({success:false,message:'Error counting orders'});
    }
}



const placeOrder = async (req, res) => {
  const frontend_url =
    process.env.VITE_API_URL || process.env.FRONTEND_URL || "http://localhost:5173";
    const promoemail= await userModel.findById(req.user.userId);

  try {
    

    const newOrder = new orderModel({
      userId: req.user.userId,
      item: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      discount: req.body.discount,
    });
    await newOrder.save();

    //  Check if promo already used by this user
    let appliedCouponId = null;
    if (req.body.promo && req.body.promo.type === "success" && req.body.promo.value) {
      const existing = await promoModel.findOne({
        promocode: req.body.promo.value.toLowerCase(),
        email: promoemail.email,
      });

      if (!existing) {
        // Create one-time coupon in Stripe
        const coupon = await stripe.coupons.create({
          amount_off: Math.round(req.body.promo.discount * 100), // cents
          currency: "usd",
          duration: "once",
        });

        appliedCouponId = coupon.id;
        
        // Save usage in DB
        await promoModel.create({
          promocode: req.body.promo.value.toLowerCase(),
          userId: req.user.userId,
          email:promoemail.email,
          orderId: newOrder._id,
          usedAt: new Date(),
          stripeCouponId: coupon.id,
        });
      }
    }

    // Empty user cart
    await userModel.findByIdAndUpdate(req.user.userId, { cartData: {} });

    // Build Stripe line items (products + delivery)
    let line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100), // item price in cents
      },
      quantity: item.quantity,
    }));

    // Add delivery charge
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Delivery Charge" },
        unit_amount: 200, // $2
      },
      quantity: 1,
    });

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      discounts: appliedCouponId ? [{ coupon: appliedCouponId }] : [],
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error in placing order" });
  }
};


const verifyOrder=async(req,res)=>{
    const {orderId,success}=req.body;
    try{
        if(success?.toLowerCase() === "true")
        {
            await orderModel.findByIdAndUpdate(orderId,{payment:true});

            // Fetch the order and user details and send comfirmation email
            const order = await orderModel.findById(orderId);
            const user = await userModel.findById(order.userId);
            if(user?.email && order.item)
            {

                const htmlContent=orderConfirmationEmail(order)
                await sendEmail(user.email, "Your Order Confirmation", htmlContent);
            }
            res.json({success:true,message:"Paid"});
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"not paid"});
        }
    }catch(error)
    {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

// user order for frontend

const userOrder=async(req,res)=>{
 try{
    const orders=await orderModel.find({userId:req.user.userId})
    res.json({success:true,data:orders})
 }catch(error)
 {
    console.log(error);
    res.json({success:false,message:"Error in fetching user orders"})
 }
}

// All order listing for admin panel
const listorders=async(req,res)=>{
    try{
        const admin_orders=await orderModel.find({});
        res.json({success:true,data:admin_orders});
    }catch(error)
    {
        console.log(error);
        res.json({success:false,message:"Error in fetching all for admin orders"})
    }
}

// api for updating order status

const updateOrderStatus=async(req,res)=>{
    try{

        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Order status updated"});

    }catch(error)
    {
        console.log(error);
        res.json({success:false,message:"Error in updating order status"});
    }

}
export {placeOrder,verifyOrder,userOrder,listorders,updateOrderStatus,countorder}