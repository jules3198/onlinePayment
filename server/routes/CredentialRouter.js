const { Router } = require("express");
const { Credentials } = require("../models/sequelize");
const { prettifyValidationErrors } = require("../lib/utils");
const router = Router();
var uniqid = require('uniqid');

router.put("/:id", (req, res) => {
    const { id } = req.params;
    Credentials.update({clientSecret: uniqid.process()+uniqid()}, {
      where: { id },
      returning: true,
      individualHooks: true,
    })
      .then(([, [data]]) =>
        data !== undefined ? res.status(200).json(data) : res.sendStatus(404)
      )
      .catch((e) => {
        if (e.name === "SequelizeValidationError") {
          res.status(400).json(prettifyValidationErrors(e.errors));
        } else {
          res.sendStatus(500);
        }
      });
  });

  module.exports = router;