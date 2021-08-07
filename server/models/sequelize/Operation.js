const { Model, DataTypes, Sequelize } = require("sequelize");
const connection = require("../../lib/sequelize");
const Transaction = require('../sequelize/Transaction');

class Operation extends Model {}

Operation.init(
  {
    operationId: DataTypes.INTEGER,
    transactionId: DataTypes.INTEGER,
    creditCard: Sequelize.json({
        name: DataTypes.STRING,
        numCard: DataTypes.INTEGER,
        csv: DataTypes.INTEGER,
        expiring: DataTypes.INTEGER
    }),
    // {
    //     type: DataTypes.TEXT,
    //     get: function() {
    //       return JSON.parse(this.getDataValue("address"));
    //     },
    //     set: function(value) {
    //       return this.setDataValue("address", JSON.stringify(value));
    //     }
    price: DataTypes.INTEGER,
    quote: Sequelize.json(),
    status: DataTypes.STRING
  },
  {
    sequelize: connection,
    modelName: "Operation",
  }
);

Transaction.belongsTo(Operation, { as: "author" });
Operation.hasMany(Transaction, { foreignKey: "authorId" });

module.exports = Operation;
