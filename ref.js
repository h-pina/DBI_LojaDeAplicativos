const express = require("express");
const app = express();
const port = 3000;

const oracledb = require("oracledb");

oracledb.initOracleClient({ libDir: "C:\\oracle\\instantclient_21_7" }); //ATENCAO: Mudar esse path no server quando colocar isso em cloud

let result;

async function run() {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: "ECLBDIT204",
      password: "EngCompLBDI22022",
      connectionString: "bdengcomp_high",
    });

    result = await connection.execute(`SELECT * FROM countries`);

    console.dir(result.rows, { depth: null });
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();

app.get("/", (req, res) => {
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
