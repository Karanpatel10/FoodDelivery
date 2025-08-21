import express from "express";
import {
  addFood,
  listFood,
  removeFood,
  countfood
} from "../controllers/FoodContorller.js";
import multer from "multer";

const foodRouter = express.Router();

// image store Engine

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.get("/list/count",countfood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
