const { Schema } = require("mongoose");
const conn = require("../../lib/mongo");

const MerchantTransactionSchema = new Schema(
    {
        _id: Number,
        societyName: String,
        transactionId: Number,
        merchantId: Number,
        Transaction: Array,
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
    }
);

const MerchantTransaction = conn.model("MerchantTransaction", MerchantTransactionSchema);

module.exports = MerchantTransaction;
