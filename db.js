const oracledb = require("oracledb");
const credentials = require("./credentials");

const express = require(`express`);
const router = express.Router();

async function query(command) {
  let result;
  let connection;
  try {
    connection = await oracledb.getConnection(credentials);
    result = await connection.execute(command);
  } catch (err) {
    console.error(err);
    await connection.close();
    return false;
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

module.exports.query = query;
