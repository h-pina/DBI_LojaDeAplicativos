//Dependencies Configs
require("dotenv").config();

const express = require("express");
const oracledb = require("oracledb");
const appsRoutes = require(`./routes/apps`);
oracledb.initOracleClient({ libDir: process.env.LIBDIR }); //ATENCAO: Mudar esse path no server quando colocar isso em cloud

const app = express();
const port = 3000;

app.use(`/apps`, appsRoutes);
app.use(`/purchases`, appsRoutes);
app.use(`/reviews`, appsRoutes);
app.use(`/users`, appsRoutes);

app.get("/", (req, res) => {
  res.send("Hi Hugo!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
