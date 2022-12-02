const express = require(`express`);
const router = express.Router();
const db = require(`../db.js`);

//Basic get Route Model
router.get(`/listAllCompanies`, async function (req, res) {
  try {
    let queryResult = await db.query("SELECT * from empresa");

    let resObj = {};
    resObj["companies"] = [];

    queryResult.rows.forEach((company) => {
      let newCompany = {
        id: company[0],
        nome: company[1],
      };
      resObj["companies"].push(newCompany);
    });

    res.json(resObj);
  } catch (error) {
    console.log("_Error: " + error.message);
  }
});

router.post(`/addCompany`, async function (req, res) {
  try {
    let parameters = req.body.data;

    //(id, nome)
    let queryRes = await db.query(
      `INSERT INTO empresa(nome) VALUES('${parameters.nome}')`
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

router.put(`/editCompany/:id`, async function (req, res) {
  try {
    let parameters = req.body.data;

    //(id, nome)
    let queryRes = await db.query(
      `UPDATE empresa SET nome='${parameters.nome}' WHERE id='${parameters.id}'`
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

router.delete(`/deleteCompany/:id/`, async function (req, res) {
  try {
    await db.query(`DELETE FROM aplicativo WHERE id_empresa='${req.params.id}'`);

    let queryResult = await db.query(
      `DELETE FROM empresa WHERE id='${req.params.id}'`
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
