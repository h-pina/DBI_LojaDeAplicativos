const express = require(`express`);
const router = express.Router();
const db = require(`../db.js`);
const utils = require("../utils.js");

//Basic get Route Model
router.get(`/listAllApps`, async function (req, res) {
  try {
    let queryResult = await db.query(
      "SELECT a.id, a.id_empresa, a.nome, e.nome nome_empresa, a.valor, a.descricao, a.versao FROM aplicativo a join empresa e on a.id_empresa = e.id"
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
        valor: app[4],
        descricao: app[5],
        versao: app[6]
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

    //(id, id_empresa, nome, descricao, versao, valor)
    let queryRes = await db.query(
      `INSERT INTO aplicativo(id_empresa, nome, descricao, versao, valor) VALUES(${parseInt(parameters.id_empresa)}, '${parameters.nome}', '${parameters.descricao}', ${parseInt(parameters.versao)}, ${parseInt(parameters.valor)}.00)`
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

router.delete(`/deleteApp/:id/`, async function (req, res) {
  try {
    await db.query(`DELETE FROM compra WHERE id_app='${req.params.id}'`);
    await db.query(`DELETE FROM avaliacao WHERE id_app='${req.params.id}'`);

    let queryResult = await db.query(
      `DELETE FROM aplicativo WHERE id='${req.params.id}'`
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

router.put(`/editAppInfo/:id`, async function (req, res) {
  try {
    let parameters = req.body;
    console.log(parameters);
    let queryResult = await db.query(
      `UPDATE aplicativo SET id_empresa=${parseInt(parameters.id_empresa)}, nome='${parameters.nome}', descricao='${parameters.descricao}', versao=${parseInt(parameters.versao)}, valor=${parseInt(parameters.valor)}.00 WHERE id=${parameters.id}`
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
