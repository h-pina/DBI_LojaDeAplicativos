const express = require(`express`);
const router = express.Router();
const db = require(`../db.js`);
const utils = require("../utils.js");

//Basic get Route Model
//(id_compra, id_app, id_user, data_compra, valor)
router.get(`/getUserPurchases/:userid`, async function (req, res) {
  try {
    let queryResult = await db.query(
      `SELECT a.nome, a.valor, c.data_compra FROM compra c join aplicativo a on c.id_app=a.id_app WHERE id_user=${req.params.userid}`
    );

    let resObj = {};
    resObj["purchases"] = [];

    queryResult.rows.forEach((purchases) => {
      let newApp = {
        nome: purchases[0],
        preco: purchases[1],
        data_compra: purchases[2],
      };
      resObj["purchases"].push(newApp);
    });
    console.log(resObj);
    res.json(resObj);
  } catch (error) {
    console.log("_Error: " + error.message);
  }
});

router.post(`/purchaseApp`, async function (req, res) {
  try {
    let parameters = req.body.data;
    //(id_compra, id_app, id_user, data_compra, valor)
    let lastBuyId = await db.query(`SELECT MAX(id_compra) from compra`);
    let newBuyId = utils.pad(parseInt(lastBuyId.rows[0]) + 1, 10).toString();
    let queryRes = await db.query(
      `INSERT INTO compra VALUES ('${newBuyId}', '${parameters.id_app}', '${parameters.id_user}', CURRENT_DATE,  ${parameters.valor})`
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

router.get(`/isAppPurchased/:userId/:appId`, async function (req, res) {
  try {
    let checkIfPurchased = await db.query(
      `SELECT COUNT(*) from compra where id_user=${req.params.userId} AND id_app=${req.params.appId} GROUP BY id_app`
    );
    if (checkIfPurchased.rows.length > 0) {
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
