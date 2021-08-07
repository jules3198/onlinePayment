const { Schema } = require("mongoose");
const conn = require("../../lib/mongo");

const MerchantSchema = new Schema({
  _id: Number,
  societyName: {type: String},
  email: {type: String},
  phoneNumber: {type: String},
  reversionaryCurrency: {type: String},
  redirectUrlConfirmation: {type: String},
  redirectUrlCancellation: {type: String},
  kbis_file_name: {type: String},
  clientToken: {type: String},
  clientSecret: {type: String},
  credentialID: Number,
  UserId: Number,
  transactions: {type: Array},
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

const Merchant = conn.model("Merchant", MerchantSchema);

module.exports = Merchant;
