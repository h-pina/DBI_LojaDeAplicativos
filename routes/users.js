const express = require(`express`);
const router = express.Router();
const db = require(`../db.js`);

router.get(`/listAllUsers`, async function (req, res) {
  try {
    let queryResult = await db.query("SELECT * from usuario");

    let resObj = {};
    resObj["users"] = [];

    queryResult.rows.forEach((user) => {
      let newUser = {
        id: user[0],
        name: user[1],
      };
      resObj["users"].push(newUser);
    });

    res.json(resObj);
  } catch (error) {
    console.log("_Error: " + error.message);
  }
});

router.post(`/addUser`, async function (req, res) {
  try {
    let parameters = req.body.data;

    //(id, nome)
    let queryRes = await db.query(
      `INSERT INTO usuario(nome) VALUES('${parameters.nome}')`
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

router.put(`/editUser/:id`, async function (req, res) {
  try {
    console.log(req.body)
    let parameters = req.body.data;

    //(id, nome)
    let queryRes = await db.query(
      `UPDATE usuario SET nome='${parameters.nome}' WHERE id='${parameters.id}'`
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

router.delete(`/deleteUser/:id/`, async function (req, res) {
  try {
    await db.query(`DELETE FROM compra WHERE id_user='${req.params.id}'`);
    await db.query(`DELETE FROM avaliacao WHERE id_user='${req.params.id}'`);

    let queryResult = await db.query(
      `DELETE FROM usuario WHERE id='${req.params.id}'`
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

module.exports = router;
