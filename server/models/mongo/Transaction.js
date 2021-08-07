const { Schema } = require("mongoose");
const conn = require("../../lib/mongo");

const TransactionSchema = new Schema({
    _id: Number,
    marchant_id: Number,
    facturationAdresse: JSON,
    deliveryAdresse: JSON,
    cart: String,
    currency: Number,
    amount: Number,
    consumer: String,
    status: Array,
});

const Transaction = conn.model("Transaction", TransactionSchema);

module.exports = Transaction;
