import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js"
import {connectDB} from "./db/database.js"
dotenv.config();
const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));
app.use(express.json());

connectDB();

app.use("/api/auth",authRoutes);

app.use("/",(req,res)=>{
    res.send("Home Page");
})

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server running http://localhost:${PORT}/`);
})