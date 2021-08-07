const { Schema } = require("mongoose");
const conn = require("../../lib/mongo");

const ExchangeRateSchema = new Schema({

    success : {
        type : Boolean,
        default : false
    },

    date : Date,

    rates : {
        type : Object,
    },

    createdAt : Date,

    idTransaction : {
        type : Schema.Types.ObjectId, ref: "Transaction"
    }
});

const ExchangeRate = conn.model("ExchangeRate", ExchangeRateSchema);

module.exports = ExchangeRate;
