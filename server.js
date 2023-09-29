const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const asanasRouter = require("./routes/asanas-router");

dotenv.config();

const app = express();

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

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log("Server Listening on PORT:", port);
});
