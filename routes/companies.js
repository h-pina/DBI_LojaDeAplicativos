const express = require(`express`);
const router = express.Router();
const db = require(`../db.js`);

//Basic get Route Model
router.get(`/listAllCompanies`, async function (req, res) {
  try {
    let queryResult = await db.query("SELECT * from empresa");

    let resObj = {};
    resObj["companies"] = [];

    queryResult.rows.forEach((company) => {
      let newCompany = {
        id: company[0],
        nome: company[1],
      };
      resObj["companies"].push(newCompany);
    });

    res.json(resObj);
  } catch (error) {
    console.log("_Error: " + error.message);
  }
});

// Add more routes later
module.exports = router;
