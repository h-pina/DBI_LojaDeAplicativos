const express = require(`express`);
const router = express.Router();
const db = require(`../db.js`);

//Basic get Route Model
router.get(`/`, async function (req, res) {
  try {
    res.json(await db.query("SELECT * FROM EMPLOYEES"));
  } catch (error) {
    console.log("_Error: " + error.message);
  }
});

// Add more routes later

module.exports = router;
