const { Model, DataTypes } = require("sequelize");
const conn = require("../../lib/sequelize");
const Merchant = require("./Merchant")

class Credentials extends Model {}

Credentials.init({ 
    clientSecret: DataTypes.STRING,
    clientToken: DataTypes.STRING
},
{
  sequelize: conn,
  modelName: "Credential",
})

Credentials.belongsTo(Merchant);
Merchant.hasOne(Credentials);
module.exports = Credentials;