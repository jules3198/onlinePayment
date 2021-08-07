const { Schema } = require("mongoose");
const conn = require("../../lib/mongo");

const TransactionSchema = new Schema({
    _id: Number,
    merchant_id: {
        type : Number, ref: "Merchant"
    },
    libelle  : String,
    facturationAdresse: String,
    deliveryAdresse: String,
    cart: Array,
    currency: String,
    amount: Number,
    consumer: String,
    status: {
        type : Array,
        required : false
    },
    nbRepayment : {
        type : "Number",
        required : false,
        default: 0
    },
    createdAt : {
        type: Date,
        required: true,
        default: Date.now
    },

    updatedAt : {
        type: Date,
        required: false,
        default: Date.now
    }

});

const Transaction = conn.model("Transaction", TransactionSchema);

module.exports = Transaction;
