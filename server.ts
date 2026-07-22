import "express-async-errors";

import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import asanasRouter from "./routes/asanas-sequence-builder/asanas.router";
import asanaGroupsRouter from "./routes/asanas-sequence-builder/asana-groups.router";
import authRouter from "./routes/auth.router";
import userRouter from "./routes/user.router";
import asanasSequencesRouter from "./routes/asanas-sequence-builder/asanas-sequences.router";
import feedbackRouter from "./routes/feedback.router";
import asanasBunchRouter from "./routes/asanas-sequence-builder/asanas-bunch.router";
import asanaGroupsCategoriesRouter from "./routes/asanas-sequence-builder/asanas-groups-categories.router";
import pranayamaSequencesRouter from "./routes/pranayamas-sequence-builder/pranayama-sequences.router";

import { isAsanasCacheLoaded, updateAsanasCache } from "./cache";

dotenv.config();

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],

  methods: ["GET", "POST", "DELETE", "PUT"],

  allowedHeaders: ["Content-Type"],

  credentials: true,
};

// middlewares

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// routers
app.use("/api/asanas", asanasRouter);
app.use("/api/asana-groups", asanaGroupsRouter);
app.use("/api/asana-group-categories", asanaGroupsCategoriesRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/asanas-sequences", asanasSequencesRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/asanas-bunch", asanasBunchRouter);
app.use("/api/pranayama-sequences", pranayamaSequencesRouter);

// catch all async errors
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: error.message });
});

const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log("Server Listening on PORT:", port);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled rejection:", error);
});

if (!isAsanasCacheLoaded()) {
  updateAsanasCache();
}
