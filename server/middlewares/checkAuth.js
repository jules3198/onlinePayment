const jwt = require('jsonwebtoken');
const { SECRET } = require('../config.json');
const role = require('../_helpers/roles');

module.exports = {
    checkAuthAdmin: (request, response, next) => {
        try {
            const token = request.headers.authorization.split(" ")[1];
            const decodedToken = jwt.verify(token, SECRET, null);
            request.merchantData = decodedToken;
            if (request.merchantData.role === role.Admin) {
                next();
            } else {
                return response.status(401).send({
                    err: error,
                    message: 'Echec permission'
                })
            }
        } catch (error) {
            return response.status(401).send({
                err: error,
                message: 'Echec authentification'
            })
        }
    },
    checkAuthMerchant: (request, response, next) => {
        try {
            const token = request.headers.authorization.split(" ")[1];
            const decodedToken = jwt.verify(token, SECRET, null);
            request.merchantData = decodedToken;
            if (request.merchantData.role === role.Merchant) {
                next();
            } else {
                return response.status(401).send({
                    err: error,
                    message: 'Echec permission'
                })
            };
        } catch (error) {
            return response.status(401).send({
                err: error,
                message: 'Echec authentification'
            })
        }
    }
}
