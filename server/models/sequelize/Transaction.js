const { Model, DataTypes, Sequelize } = require("sequelize");
const connection = require("../../lib/sequelize");
const Merchant = require('../sequelize/Merchant');

class Transaction extends Model {}

Transaction.init(
  {
    libelle: DataTypes.STRING,
    billingAddress: Sequelize.json({
      address: DataTypes.STRING,
      zipCode: DataTypes.STRING,
      city: DataTypes.STRING,
      country: DataTypes.STRING
    }),
    shippingAddress: Sequelize.json({
      address: DataTypes.STRING,
      zipCode: DataTypes.STRING,
      city: DataTypes.STRING,
      country: DataTypes.STRING
    }),
    cart: Sequelize.ARRAY(Sequelize.TEXT),
    currency: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    consumer:  Sequelize.json({
      lastname: DataTypes.STRING,
      firstname: DataTypes.STRING
    }),
    status: Sequelize.ARRAY(Sequelize.TEXT)
  },
  {
    sequelize: connection,
    modelName: "Transaction",
  }
);

Transaction.belongsTo(Merchant, { as: "author" });
Merchant.hasMany(Transaction, { foreignKey: "authorId" });

//Transaction.drop();

module.exports = Transaction;
