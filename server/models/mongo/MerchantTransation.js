const { Schema } = require("mongoose");
const connection = require("../../lib/sequelize");

const MerchantTransactionSchema = new Schema(
    {
        _id: Number,
        societyName: String,
        transactionId: Number,
        merchantId: Number,
        createdAt: Date,
        Transaction: Array
    },
    {
        sequelize: connection,
        modelName: "MerchantTransaction",
    }
);

module.exports = MerchantTransaction;
