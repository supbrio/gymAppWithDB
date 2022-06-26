const dotenv = require("dotenv");
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log(`Uncaught exception, Shutting down the application`);
  console.error(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: `${__dirname}/config.env` });
const app = require(`./app.js`);
const DB = process.env.LOCAL_DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((res) => {
    console.log("DB connection was a fricking success!!");
  });

const { PORT } = process.env || 3000;
app.listen(PORT, () => console.log(`App running on port ${PORT}...`));

process.on("unhandledRejection", (err) => {
  console.log(`Unhandled rejection, Shutting down the application`);
  console.error(err);
  server.close(() => {
    process.exit(1);
  });
});

// $env:NODE_ENV="production"
// in package.json: SET NODE_ENV=production&&nodemon server.js
