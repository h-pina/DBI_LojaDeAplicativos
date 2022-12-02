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
      `INSERT INTO avaliacao(id_app, id_user, id_compra, nota) VALUES('${parseInt(parameters.id_app)}','${parseInt(parameters.id_user)}', '${parseInt(parameters.id_compra)}', ${parseInt(parameters.nota)})`
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

// (id, id_app, id_user, id_compra, nota)
router.get(`/listReview`, async function (req, res) {
  try {
    let queryResult = await db.query("SELECT * from avaliacao");

    let resObj = {};
    resObj["avaliacao"] = [];

    queryResult.rows.forEach((avaliacao) => {
      let newAvaliacao = {
        id: avaliacao[0],
        id_app: avaliacao[1],
        id_user: avaliacao[2],
        id_compra: avaliacao[3],
        nota: avaliacao[4],
      };
      resObj["avaliacao"].push(newAvaliacao);
    });

    res.json(resObj);
  } catch (error) {
    console.log("_Error: " + error.message);
  }
});

router.put(`/editReview/:id`, async function (req, res) {
  try {
    let parameters = req.body;
    console.log(parameters);
    let queryResult = await db.query(
      `UPDATE avaliacao SET id_app=${parseInt(parameters.id_app)}, id_user=${parameters.id_user}, id_compra=${parameters.id_compra}, nota=${parseInt(parameters.nota)} WHERE id=${parseInt(parameters.id)}`
    );
    if (queryResult.rowsAffected > 0) {
      res.send(true);
    } else {
      res.send(false);
    }
  } catch (error) {
    console.log("_Error: " + error.message);
  }
});

router.delete(`/deleteReview/:id/`, async function (req, res) {
  try {
    console.log(req.params.id)
    let queryResult = await db.query(
      `DELETE FROM avaliacao WHERE id='${req.params.id}'`
    );

    if (queryResult.rowsAffected > 0) {
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
