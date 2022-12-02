const express = require(`express`);
const router = express.Router();
const db = require(`../db.js`);
const utils = require("../utils.js");

//Basic get Route Model

//(id_compra, id_app, id_user, data_compra, valor)
router.get(`/getUserPurchases/:id`, async function (req, res) {
  try {
    let queryResult = await db.query(
      `SELECT a.nome, a.valor, c.data_compra, c.id_user, c.id FROM compra c join aplicativo a on c.id_app=a.id WHERE id_user=${req.params.id} ORDER BY c.data_compra  `
    );

    let resObj = {};
    resObj["purchases"] = [];

    queryResult.rows.forEach((purchases) => {
      let newApp = {
        nome: purchases[0],
        valor: purchases[1],
        data_compra: purchases[2],
        id_user: purchases[3],
        id: purchases[4]
      };
      resObj["purchases"].push(newApp);
    });
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

router.get(`/getPurchaseId/:userId/:appId`, async function (req, res) {
  try {
    let checkIfPurchased = await db.query(
      `SELECT id_compra from compra where id_user=${req.params.userId} AND id_app=${req.params.appId} `
    );
    if (checkIfPurchased.rows.length > 0) {
      res.send(checkIfPurchased.rows[0]);
    } else {
      res.send(false);
    }
  } catch (error) {
    console.log("_Error: " + error.message);
  }
});

router.post(`/addPurchase`, async function (req, res) {
  try {
    let parameters = req.body.data;
    console.log(
      parameters
    );
    //(id_compra, id_app, id_user, data_compra, valor)
    let queryRes = await db.query(
      `INSERT INTO compra(id_app, id_user, data_compra, valor) VALUES(${parseInt(parameters.id_app)}, ${parseInt(parameters.id_user)}, TO_DATE('${parameters.data_compra}', 'DD/MM/YYYY'), ${parseInt(parameters.valor)}.00)`
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

router.put(`/editPurchase/:id`, async function (req, res) {
  try {
    console.log(req.body)
    let parameters = req.body;

    //(id, nome)
    console.log(`UPDATE compra SET id_app=${parseInt(parameters.id_app)}, id_user=${parseInt(parameters.id_user)}, data_compra=TO_DATE('${parameters.data_compra}', 'DD/MM/YYYY'), valor=${parseInt(parameters.valor)}.00) WHERE id=${parseInt(parameters.id)}`)
    let queryRes = await db.query(
      `UPDATE compra SET id_app=${parseInt(parameters.id_app)}, id_user=${parseInt(parameters.id_user)}, data_compra=TO_DATE('${parameters.data_compra}', 'DD/MM/YYYY'), valor=${parseInt(parameters.valor)}.00 WHERE id=${parseInt(parameters.id)}`
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

router.delete(`/deletePurchase/:id/`, async function (req, res) {
  try {
    let queryResult = await db.query(
      `DELETE FROM compra WHERE id='${req.params.id}'`
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
