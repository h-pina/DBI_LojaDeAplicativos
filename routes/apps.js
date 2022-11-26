const express = require(`express`);
const router = express.Router();
const db = require(`../db.js`);

//Basic get Route Model
router.get(`/listAllApps`, async function (req, res) {
  try {
    let queryResult = await db.query(
      "SELECT a.id_app, a.id_empresa, a.nome, e.nome nome_empresa FROM aplicativo a join empresa e on a.id_empresa = e.id_empresa"
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
        preco: 00,
      };
      resObj["apps"].push(newApp);
    });

    res.send(resObj);
  } catch (error) {
    console.log("_Error: " + error.message);
  }
});

// Add more routes later
module.exports = router;
