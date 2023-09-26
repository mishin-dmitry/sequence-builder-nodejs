import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import asanasRouter from "./routes/asanas-router";

dotenv.config();

const app: Express = express();

const corsOptions = {
  origin: "http://localhost:3000",

  methods: ["GET", "POST", "DELETE", "PUT"],

  allowedHeaders: ["Content-Type"],
};

// middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

// routers
app.use("/api/asanas", asanasRouter);
app.use("/images", express.static("images"));

const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log("Server Listening on PORT:", port);
});
