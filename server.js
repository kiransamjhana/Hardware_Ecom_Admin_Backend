import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";

import path from "path";

import connectMongoDB from "./src/config/mongoconfig.js";
connectMongoDB();

const PORT = process.env.PORT || 8000;
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
const __dirname = path.resolve();
console.log(__dirname);

//converting public folder to static serving folder
app.use(express.static(path.join(__dirname, "/public")));

//api
import adminRouter from "./src/router/adminRouter.js";
import categoryRouter from "./src/router/categoryRouter.js";
import paymentOptionRouter from "./src/router/paymentOptionRouter.js";
import { auth } from "./src/middleaware/authMiddleware.js";
import productRouter from "./src/router/productRouter.js";
import orderRouter from "./src/router/orderRouter.js";
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/category", auth, categoryRouter);
app.use("/api/v1/payment", auth, paymentOptionRouter);
app.use("/api/v1/product", auth, productRouter);
app.use("/api/v1/order", orderRouter);
//connect database

app.get("/", (req, res) => {
  res.json({
    status: "sucess",
    message: "thank you very much yo9ur sever is very fast",
  });
});

app.use((error, req, res, next) => {
  console.log(error);
  const code = error.statusCode || 500;
  res.status(code).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`your server is running at http://localhost:${PORT}`);
});
