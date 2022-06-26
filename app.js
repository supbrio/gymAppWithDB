const path = require("path");
const express = require("express");
const cors = require("cors");
const globalErrorHandler = require("./controllers/errorController");
const morgan = require("morgan");

const viewRouter = require("./routes/viewRoutes");
const workoutRouter = require(`./routes/workoutRoutes`);
const userRouter = require(`./routes/userRoutes`);

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//////////////
// MIDDLEWARES
//////////////
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log("Hello from middleware!!!!!!!");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//////////////
// ROUTES
//////////////
app.use(cors());

app.use("/", viewRouter);
app.use("/api/v1/workouts", workoutRouter);
app.use("/api/v1/users", userRouter);
// app.use("/", viewRouter);

app.use(globalErrorHandler);
module.exports = app;
