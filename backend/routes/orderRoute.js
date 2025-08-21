import express from "express"
import authMiddleware from "../middleware/auth.js";
import { countorder, listorders, placeOrder, updateOrderStatus, userOrder, verifyOrder } from "../controllers/orderController.js"

const orderRouter=express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorder",authMiddleware,userOrder);
orderRouter.get("/list",listorders);
orderRouter.get("/list/ordercount",countorder)
orderRouter.put("/orderstatus",updateOrderStatus);

export default orderRouter;