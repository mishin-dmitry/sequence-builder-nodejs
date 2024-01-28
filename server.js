const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const asanasRouter = require("./routes/asanas.router");
const asanaGroupsRouter = require("./routes/asana-groups.router");
const authRouter = require("./routes/auth.router");
const userRouter = require("./routes/user.router");
const sequencesRouter = require("./routes/sequences.router");
const sequencesListRouter = require("./routes/sequences-list.router");
const feedbackRouter = require("./routes/feedback.router");
const asanasBunchRouter = require("./routes/asanas-bunch.router");

const { isAsanasCacheEmpty, updateAsanasCache } = require("./cache");

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
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/sequences", sequencesRouter);
app.use("/api/sequences-list", sequencesListRouter);
app.use("/api/feedback", feedbackRouter);
app.use("/api/asanas-bunch", asanasBunchRouter);

// catch all async errors
app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log("Server Listening on PORT:", port);
});

if (isAsanasCacheEmpty()) {
  updateAsanasCache();
}
