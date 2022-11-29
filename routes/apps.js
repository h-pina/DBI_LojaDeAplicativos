const express = require(`express`);
const router = express.Router();
const db = require(`../db.js`);
const utils = require("../utils.js");

//Basic get Route Model
router.get(`/listAllApps`, async function (req, res) {
  try {
    let queryResult = await db.query(
      "SELECT a.id_app, a.id_empresa, a.nome, e.nome nome_empresa, a.valor FROM aplicativo a join empresa e on a.id_empresa = e.id_empresa"
    );

    let resObj = {};
    resObj["apps"] = [];

    queryResult.rows.forEach((app) => {
      let newApp = {
        img_link: "",
        id: app[0],
        id_empresa: app[1],
        nome: app[2],
        nome_empresa: app[3],
        preco: app[4],
      };
      resObj["apps"].push(newApp);
    });
    res.json(resObj);
  } catch (error) {
    console.log("_Error: " + error.message);
  }
});

router.get(`/getAppFullInfo/:appId`, async function (req, res) {
  try {
    let mainQuery = await db.query(
      `SELECT a.id_app, a.id_empresa, a.nome, e.nome nome_empresa, a.descricao, a.versao, a.valor FROM aplicativo a join empresa e on a.id_empresa = e.id_empresa WHERE id_app=${req.params.appId} `
    );

    let reviewsList = await db.query(
      `SELECT av.id_user, u.nome, av.nota FROM usuario u join avaliacao av on u.id_user = av.id_user WHERE av.id_app=${req.params.appId} `
    );

    let revList = [];
    reviewsList.rows.forEach((review) => {
      revList.push({
        id: review[0],
        usuario: review[1],
        nota: review[2],
      });
    });

    let resObj = {};
    resObj["app"] = [];

    let data = mainQuery.rows[0];

    let appInfo = {
      id: data[0],
      id_empresa: data[1],
      nome: data[2],
      nome_empresa: data[3],
      descricao: data[4],
      versao: data[5],
      reviews: revList,
      preco: data[6],
    };
    resObj["app"].push(appInfo);

    res.json(resObj);
  } catch (error) {
    console.log("_Error: " + error.message);
  }
});

router.post(`/addNewApp`, async function (req, res) {
  try {
    let parameters = req.body.data;
    //(id_compra, id_app, id_user, data_compra, valor)
    let lastAppId = await db.query(`SELECT MAX(id_app) from aplicativo`);
    let newAppId = utils.pad(parseInt(lastAppId.rows[0]) + 1, 10).toString();
    let queryRes = await db.query(
      `INSERT INTO aplicativo VALUES ('${newAppId}', '${parameters.id_empresa}', '${parameters.nome}', '${parameters.descricao}',  ${parameters.versao}, ${parameters.valor})`
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

router.delete(`/deleteApp/:appId/`, async function (req, res) {
  try {
    let queryResult = await db.query(
      `DELETE FROM aplicativo WHERE id_app=${req.params.appId}`
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

//TODO
router.put(`/editAppInfo/:appId/`, async function (req, res) {
  try {
  } catch (error) {
    console.log("_Error: " + error.message);
  }
});

// Add more routes later
module.exports = router;
