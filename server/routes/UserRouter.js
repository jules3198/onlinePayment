const { Router } = require("express");
<<<<<<< HEAD
const { prettifyErrors } = require("../lib/utils");
=======
const { prettifyValidationErrors } = require("../lib/utils");
>>>>>>> c541fac51be2cbde02fc3879833a10c7861fae41
const { User } = require("../models/sequelize");

const router = Router();

// User sequelize
router.get("/", (request, response) => {
  User.findAll({ where: request.query })
  .then((data) => response.json(data))
  .catch((e) => response.sendStatus(500));
});

router.post("/", (request, response) => {
  new User(request.body)
  .save()
  .then((data) => response.status(201).json(data))
  .catch((e) => {
    if (e.name === "SequelizeValidationError") {
      response.status(400).json(prettifyValidationErrors(e));
    } else {
      response.sendStatus(500);
    }
  });
});

router.get("/:id", (request, response) => {
  User.findByPk(request.params.id)
  .then((data) =>
    data === null ? response.sendStatus(404) : response.json(data)
  )
  .catch((e) => response.sendStatus(500));
});

router.put("/:id", (request, response) => {
  User.update(request.body, {
    where: { id: request.params.id },
    returning: true,
    individualHooks: true,
  })
  .then(([, [data]]) =>
    data === undefined ? response.sendStatus(404) : response.json(data)
  )
  .catch((e) => {
    if (e.name === "SequelizeValidationError") {
      response.status(400).json(prettifyValidationErrors(e));
    } else {
      console.log(e);
      response.sendStatus(500);
    }
  });
});

router.delete("/:id", (request, response) => {
  User.destroy({ where: { id: request.params.id } })
  .then((data) =>
    data === 0 ? response.sendStatus(404) : response.sendStatus(204)
  )
  .catch((e) => response.sendStatus(500));
});

module.exports = router;
