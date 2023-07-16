import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectMongoDB from "./src/config/mongoconfig.js";
dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

//connect database

connectMongoDB();
// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "sucess",
    message: "thank you very much yo9ur sever is very fast",
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`your server is running at http://localhost:${PORT}`);
});
