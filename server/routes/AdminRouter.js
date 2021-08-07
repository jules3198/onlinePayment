const { Router } = require("express");
const { prettifyValidationErrors } = require("../lib/utils");
const Admin = require('../models/sequelize/Admin');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET, EXPIRESIN } = require('../config.json');
const auth = require('../middlewares/checkAuth');
const role = require('../_helpers/roles');

const router = Router();

// ADMIN
router.post("/signup", (request, response, next) => {
    Admin.findOne({ where: {email: request.body.email} })
    .then(admin => {
        if (admin === null) {
            new Admin(request.body)
            .save()
            .then(() => response.status(201).send({message: 'Admin créé'}))
            .catch(e => {
                if (e.societyName === "SequelizeValidationError") {
                    response.status(400).json(prettifyValidationErrors(e));
                } else {
                    response.sendStatus(500);
                }
            })
        } else {
            return response.status(409).send({
                error: 'Cet email existe déjà'
            })
        }
    })
    .catch(e => {
        response.sendStatus(500);
    });
});

router.post("/login", (request, response, next) => {
    Admin.findOne({ where: {email: request.body.email} })
    .then(admin => {
        if (admin !== null) {
            bcrypt.compare(request.body.password, admin.password)
            .then(result => {
                if(result) {
                    const token = jwt.sign({email: admin.email, firstname: admin.firstname, lastname: admin.lastname, role: role.Admin}, SECRET, {algorithm: 'HS512', expiresIn: EXPIRESIN });
                    return response.status(200).json({
                        msg: 'Authentification réussi',
                        token: token
                    });
                } else {
                    return response.status(404).json({ err: 'Echec d\'authentification'});
                }
            })
            .catch(e => {response.sendStatus(500)});
        } else {
            response.status(404).json({ err: 'Echec authentification'});
        }
    });
});

router.get("/", auth.checkAuthAdmin, (request, response) => {
    Admin.findAll({ where: request.query })
    .then(data => response.status(200).json(data))
    .catch((e) => response.sendStatus(500));
});

module.exports = router;
