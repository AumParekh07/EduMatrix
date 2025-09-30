import express, { Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from 'cors'

import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import adminRoutes from "./routes/adminRoutes";
import studentRoutes from "./routes/studentRoutes";
import passRoutes from "./routes/passRoutes";
dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // because sending authorization headers
}));

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/student", studentRoutes)

app.use("/api/v1/auth", passRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("<h1 style='color:blue'>SERVER  IS  Running..... </h1>");
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});