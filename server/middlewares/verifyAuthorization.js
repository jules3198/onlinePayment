const Merchant = require('../models/sequelize/Merchant');
const verifJWT = require("../lib/security").verifJWT;
const User = require("../models/sequelize/User");

module.exports = function verifyAuthorization(req, res, next) {
    const authorization = req.headers["authorization"];
    if (!authorization) res.sendStatus(401);
    const [type, token] = authorization.split(/\s+/);
    if (!["Basic", "Bearer"].includes(type)) res.sendStatus(401);
    switch (type) {
      case "Basic":
        if(!validCredentials(token)) res.sendStatus(403);
        req.merchant = validCredentials(token);
        break;
      case "Bearer":
        verifJWT(token)
        .then(async (user) => {
          const users = await User.findOne({ where: {username: user.username} });
          if(!users) {
            res.sendStatus(401);
          }else {
            req.user = users;
          }

          req.merchant = users.merchant;
          next();
        })
        .catch(() => res.sendStatus(401));
        break;
    }
    next();
};
