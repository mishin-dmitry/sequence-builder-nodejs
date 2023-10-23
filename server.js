const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieSession = require("cookie-session");

const asanasRouter = require("./routes/asanas.router");
const asanaGroupsRouter = require("./routes/asana-groups.router");
const authRouter = require("./routes/auth.router");

dotenv.config();

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],

  methods: ["GET", "POST", "DELETE", "PUT"],

  allowedHeaders: ["Content-Type"],
};

// middlewares

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: [process.env.SECRET],
    httpOnly: true,
  })
);

// routers
app.use("/api/asanas", asanasRouter);
app.use("/api/asana-groups", asanaGroupsRouter);
app.use("/api/auth", authRouter);

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log("Server Listening on PORT:", port);
});
