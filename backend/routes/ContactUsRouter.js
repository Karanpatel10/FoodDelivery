import express from "express";
import contacaustemp from "../utils/ContactUsTemple.js";

const contactusRouter=express.Router();

contactusRouter.post("/",contacaustemp)

export default contactusRouter;