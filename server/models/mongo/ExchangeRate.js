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

    idTransaction : {
        type : Schema.Types.ObjectId, ref: "Transaction"
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

const ExchangeRate = conn.model("ExchangeRate", ExchangeRateSchema);

module.exports = ExchangeRate;
