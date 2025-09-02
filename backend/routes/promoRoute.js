import express from "express"
import authMiddleware from "../middleware/auth.js"
import { promoValidator } from "../controllers/promoController.js";

const promoRouter=express.Router();

promoRouter.post("/validate",authMiddleware,promoValidator);

export default promoRouter;