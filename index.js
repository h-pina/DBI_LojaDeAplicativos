//Dependencies Configs
require("dotenv").config();

const express = require("express");
const oracledb = require("oracledb");
oracledb.initOracleClient({ libDir: process.env.LIBDIR });

const appsRoutes = require(`./routes/apps`);
const purchasesRoutes = require(`./routes/purchases`);
const reviewsRoutes = require(`./routes/reviews`);
const usersRoutes = require(`./routes/users`);

const app = express();
const port = 3000;

app.use(`/apps`, appsRoutes); //Base URL definitions for differente routes
app.use(`/purchases`, purchasesRoutes);
app.use(`/reviews`, reviewsRoutes);
app.use(`/users`, usersRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
