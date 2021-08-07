const { Schema } = require("mongoose");
const conn = require("../../lib/mongo");

const UserSchema = new Schema({
    _id: Number,
    firstname: {type: String},
    lastname: {type: String},
    username: {type: String},
    password: {type: String},
    confirmed: {type: Boolean},
    roles: {type: [String]},

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

const User = conn.model("User", UserSchema);

module.exports = User;
