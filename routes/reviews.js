const express = require(`express`);
const router = express.Router();
const db = require(`../db.js`);

//Basic get Route Model
//TODO
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

// Add more routes later
module.exports = router;
