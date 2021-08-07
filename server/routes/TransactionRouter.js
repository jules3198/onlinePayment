const { Router } = require("express");
const { prettifyValidationErrors } = require("../lib/utils");
const Transaction = require("../models/sequelize/Transaction");
const auth = require('../middlewares/checkAuth');

const router = Router();

router.get("/", auth.checkAuthMerchant, (request, response) => {
    Transaction.findAll({ where: request.query })
        .then((data) => response.json(data))
        .catch((e) => response.sendStatus(500));
});

router.post("/", auth.checkAuthMerchant, (request, response) => {
    axios.post("http://localhost:3003/confirmPayment")
    .then(function (resp){

        if(resp.status === 202) {
            new Transaction(request.body)
                .save()
                .then((data) => response.status(201).json(data))
                .catch((e) => {
                    if (e.name === "SequelizeValidationError") {
                        response.status(400).json(prettifyErrors(e));
                    } else {
                        response.sendStatus(500);
                    }
            });
        }
        else {
            response.sendStatus(500);
        }
    }).catch( err => {
       response.status(400).json(prettifyErrors(err));
    }) 

});

router.get("/:id", auth.checkAuthMerchant, (request, response) => {
    Transaction.findByPk(request.params.id)
    .then((data) =>
        data === null ? response.sendStatus(404) : response.json(data)
    )
    .catch((e) => response.sendStatus(500));
});

router.put("/:id", auth.checkAuthMerchant, (request, response) => {
    Transaction.update(request.body, {
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

router.delete("/:id", auth.checkAuthMerchant, (request, response) => {
    Transaction.destroy({ where: { id: request.params.id } })
    .then((data) =>
        data === 0 ? response.sendStatus(404) : response.sendStatus(204)
    )
    .catch((e) => response.sendStatus(500));
});

module.exports = router;
