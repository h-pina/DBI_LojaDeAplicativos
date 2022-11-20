const credentials = require("./credentials");

let result;

async function exec(oracledb, command) {
  let connection;
  console.log(credentials);
  try {
    connection = await oracledb.getConnection(credentials);
    result = await connection.execute(command);
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
        return result;
      } catch (err) {
        console.error(err);
      }
    }
  }
}

exports.exec = exec;
