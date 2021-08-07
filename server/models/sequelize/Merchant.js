const { Model, DataTypes } = require("sequelize");
const User = require("./User");
const conn = require("../../lib/sequelize");

class Merchant extends Model {}

Merchant.init(
    {
        societyName: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'MerchantAuth'
        },
        KBIS: DataTypes.STRING,
        address: DataTypes.STRING,
        telephone: DataTypes.INTEGER,
        urlRedirectionConfirm: DataTypes.STRING,
        urlRedirectionCancel: DataTypes.STRING,
        currency: DataTypes.STRING,
        confirmed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    },
    {
        sequelize: connection,
        modelName: "Merchant",
    }
);

const encodePassword = async (merchant) => {
    merchant.password = await bcrypt.hash(merchant.password, await bcrypt.genSalt());
};
Merchant.addHook("beforeCreate", encodePassword);
Merchant.addHook("beforeUpdate", encodePassword);

module.exports = Merchant;
