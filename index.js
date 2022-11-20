//Dependencies Configs
require("dotenv").config();

const express = require("express");
const oracledb = require("oracledb");
oracledb.initOracleClient({ libDir: "C:\\oracle\\instantclient_21_7" }); //ATENCAO: Mudar esse path no server quando colocar isso em cloud

const db = require("./db.js");
const app = express();
const port = 3000;

let result;
(async () => {
  result = await db.exec(oracledb, "SELECT * FROM EMPLOYEES");
  console.log(result);
})();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.get("/showFunc", (req, res) => {
  console.log("resultado: " + result);
  res.send(result.rows);
});

app.get("/", (req, res) => {
  res.send("Hi Hugo!");
});
