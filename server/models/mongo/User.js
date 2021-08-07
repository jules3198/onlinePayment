const { Schema } = require("mongoose");
const conn = require("../../lib/mongo");

const UserSchema = new Schema({
    _id: Number,
    firstname: {type: String},
    lastname: {type: String},
    username: {type: String},
    password: {type: String},
    confirmed: {type: Boolean},
    roles: {type: [String]}
  });
  
  const User = conn.model("User", UserSchema);
  
  module.exports = User;