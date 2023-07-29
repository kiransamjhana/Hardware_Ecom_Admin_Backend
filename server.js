import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectMongoDB from "./src/config/mongoconfig.js";
dotenv.config();
connectMongoDB();
const PORT = process.env.PORT || 8000;
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//api
import adminRouter from "./src/router/adminRouter.js";
import categoryRouter from "./src/router/categoryRouter.js";

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/category", categoryRouter);
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
