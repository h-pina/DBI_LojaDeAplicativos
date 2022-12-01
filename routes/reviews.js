const express = require(`express`);
const router = express.Router();
const db = require(`../db.js`);

//Basic get Route Model

router.post(`/addReview`, async function (req, res) {
  try {
    let parameters = req.body.data;
    console.log(
      `INSERT INTO avaliacao VALUES('${parameters.id_app}','${parameters.id_user}', '${parameters.id_compra}', ${parameters.nota})`
    );
    //(id_compra, id_app, id_user, data_compra, valor)
    let queryRes = await db.query(
      `INSERT INTO avaliacao VALUES('${parameters.id_app}','${parameters.id_user}', '${parameters.id_compra}', ${parameters.nota})`
    );
    if (queryRes) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {
    console.log("_Error: " + error.message);
  }
});

router.get(`/isAppReviewed/:userId/:appId`, async function (req, res) {
  try {
    let checkIfReviewed = await db.query(
      `SELECT COUNT(*) from avaliacao where id_user=${req.params.userId} AND id_app=${req.params.appId} GROUP BY id_app`
    );
    if (checkIfReviewed.rows.length > 0) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {
    console.log("_Error: " + error.message);
  }
});

// Add more routes later
module.exports = router;
