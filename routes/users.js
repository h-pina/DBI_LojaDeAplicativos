const express = require(`express`);
const router = express.Router();
const db = require(`../db.js`);

//Basic get Route Model
router.get(`/listAllUsers`, async function (req, res) {
  try {
    let queryResult = await db.query("SELECT * from usuario");

    let resObj = {};
    resObj["users"] = [];

    queryResult.rows.forEach((user) => {
      let newUser = {
        id: user[0],
        name: user[1],
      };
      resObj["users"].push(newUser);
    });

    res.json(resObj);
  } catch (error) {
    console.log("_Error: " + error.message);
  }
});

// Add more routes later
module.exports = router;
