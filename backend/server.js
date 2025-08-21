import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/FoodRoute.js";
import userRouter from "./routes/UserRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/CartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import contactusRouter from "./routes/ContactUsRouter.js";

// app config
const app = express();
const port = process.env.PORT||4000;

// middleware
app.use(express.json());
app.use(cors());
app.use("/image", express.static("uploads"));

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use('/api/user',userRouter);
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);
app.use('/api/contactus',contactusRouter);

app.get("/", (req, res) => {
  res.send("API worked success");
});

app.listen(port, () => {
  console.log(`server start port ${port}`);
});
