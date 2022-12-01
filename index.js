//Dependencies Configs
require("dotenv").config();

const express = require("express");
const oracledb = require("oracledb");
oracledb.initOracleClient({ libDir: process.env.LIBDIR });
oracledb.autoCommit = true;

const appsRoutes = require(`./routes/apps`);
const purchasesRoutes = require(`./routes/purchases`);
const reviewsRoutes = require(`./routes/reviews`);
const usersRoutes = require(`./routes/users`);

const app = express();
const port = 5000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  next();
});

app.use(express.json());
app.use(`/apps`, appsRoutes); //Base URL definitions for differente routes
app.use(`/purchases`, purchasesRoutes);
app.use(`/reviews`, reviewsRoutes);
app.use(`/users`, usersRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
