const express = require(`express`);
const router = express.Router();
const db = require(`../db.js`);

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
      `SELECT * from avaliacao WHERE id_app=${req.params.appId} `
    );

    console.log(mainQuery.rows);
    console.log(reviewsList.rows);

    let resObj = {};
    resObj["app"] = [];

    //let reviewsList = ;

    let appInfo = {
      id: mainQuery[0][0],
      id_empresa: mainQuery[0][1],
      nome: mainQuery[0][2],
      nome_empresa: mainQuery[0][3],
      descricao: mainQuery[0][4],
      versao: mainQuery[0][5],
      reviews: reviewsList,
      preco: mainQuery[0][6],
    };
    resObj["app"].push(newApp);
    //res.json(resObj);
  } catch (error) {
    console.log("_Error: " + error.message);
  }
});

// Add more routes later
module.exports = router;
