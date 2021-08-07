const { Router } = require("express");
const { Merchant } = require("../models/sequelize");
const MerchantMongo = require("../models/mongo/Merchant")
const { prettifyValidationErrors } = require("../lib/utils");
var multer = require('multer');

var filename = '';
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, './upload');
   },
  filename: function (req, file, cb) {
      let extension = "."+file.mimetype.split("/")[1];
      filename = Date.parse(new Date())+extension;
      cb(null , filename);
  }
});
var upload = multer({ storage: storage })
const router = Router();

router.get("/", (request, response) => {
  Merchant.findAll({ where: request.query })
    .then((data) => response.json(data))
    .catch((e) => response.sendStatus(500));
});

router.post("/", upload.single('kbsfile'),(req, res) => {
  req.body.kbis_file_name = filename;
  new Merchant(req.body)
    .save()
    .then((data) => {
      res.status(201).json(data)
    })
    .catch((e) => {
      if (e.name === "SequelizeValidationError") {
        console.error(e);
        res.status(400).json(prettifyValidationErrors(e.errors));
      } else {
        console.log(e);
        res.sendStatus(500);
      }
    })
});
router.get("/:id", (request, response) => {
  const { id } = request.params;
  Merchant.findByPk(id)
    .then((data) =>
      data === null ? response.sendStatus(404) : response.json(data)
    )
    .catch((e) => response.sendStatus(500));
});
router.put("/:id", (req, res) => {
  const { id } = req.params;
  Merchant.update(req.body, {
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
router.delete("/:id", (request, response) => {
  const { id } = request.params;
  Merchant.destroy({ where: { id } })
    .then((data) =>
      data === 0 ? response.sendStatus(404) : response.sendStatus(204)
    )
    .catch((e) => response.sendStatus(500));
});

module.exports = router;
