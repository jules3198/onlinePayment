const { Model, DataTypes } = require("sequelize");
const connection = require("../../lib/sequelize");
const bcrypt = require("bcryptjs");

class Admin extends Model {}

Admin.init(
  {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'AdminAuth'
    },
    password: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    token: DataTypes.STRING
  },
  {
    sequelize: connection,
    modelName: "Admin",
  }
);

const encodePassword = async (admin) => {
  admin.password = await bcrypt.hash(admin.password, await bcrypt.genSalt());
};

Admin.addHook("beforeCreate", encodePassword);
Admin.addHook("beforeUpdate", encodePassword);

module.exports = Admin;
