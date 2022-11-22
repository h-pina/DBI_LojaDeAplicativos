const express = require(`express`);
const router = express.Router();
const db = require(`../db.js`);

router.get(`/`, async function (req, res) {
  try {
    res.json(await db.query("SELECT * FROM EMPLOYEES"));
  } catch (error) {
    console.log("_Error: " + error.message);
  }
});

module.exports = router;
