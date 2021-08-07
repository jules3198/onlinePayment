const connection = require("../../lib/sequelize");
const User = require("./User");
const Merchant = require("./Merchant");
const MongoUser = require("../mongo/User");
const MongoMerchant = require("../mongo/Merchant");
const Transaction = require("./Transaction");
const Credentials = require("./credentials");

var uniqid = require('uniqid');

// export MONGO_URL=mongodb://root:password@localhost:27017/payment
// export DATABASE_URL=postgres://root:password@localhost:5432/payment

connection.sync({ alter: true }).then((_) => console.log("Database synced"));

const denormalizeUser = (user) => {
  User.findByPk(user.id
  ).then((data) => {
    const denormalizedUser = data.toJSON();
    denormalizedUser._id = denormalizedUser.id;
    MongoUser.findOneAndReplace(
      { _id: denormalizedUser.id },
      denormalizedUser,
      { upsert: true, new: true }
    ).then((data) => console.log(`User ${data._id} saved to mongo`));
  });
};

const denormalizeMerchant = (merchant) => {
   Merchant.findByPk(merchant.id, {
    include: [{ model: Credentials, attributes: ["id", "clientSecret", "clientToken"] }],
  })
   .then( (data) => {
     const denormalizeMerchant = data.toJSON();
     denormalizeMerchant.clientSecret = denormalizeMerchant.Credential.clientSecret;
     denormalizeMerchant.clientToken = denormalizeMerchant.Credential.clientToken;
     denormalizeMerchant.credentialID = denormalizeMerchant.Credential.id
      MongoMerchant.findOneAndReplace(
        {_id: denormalizeMerchant.id},
        denormalizeMerchant,
        { upsert: true, new: true }
        ).then((data) => console.log(`Merchant ${data._id} saved to mongo`));
   });
}

const createCredentials = (merchant) => {
   let credentials = {
     MerchantId: merchant.id,
     clientSecret: uniqid.process()+uniqid(),
     clientToken: uniqid()
    }

    new Credentials(credentials).save()
    .then( (data) => {denormalizeMerchant(merchant)})
}


const initCredentialsAfterCreate = (merchant) => {
  Merchant.findByPk(merchant.id)
   .then( (data) => {
      createCredentials(data.toJSON())
   })
}

const denormalizeCredentials = async (credentials) => {
  //console.log("credentials ", credentials)
    MongoMerchant.findByIdAndUpdate(credentials.toJSON().MerchantId,{clientSecret: credentials.toJSON().clientSecret},(err, resp) => {
      console.log(`Credential ${resp._id} saved to mongo`)
    });
}

const denormaliezTransactions = async (transaction) => {
  MongoMerchant.findById(transaction.authorId,async (err,merchant) => {
    let transactionlist = [];
    transactionlist = merchant.transactions;
    transactionlist.push(transaction.toJSON());
    MongoMerchant.findByIdAndUpdate(transaction.authorId,{transactions: transactionlist}, (err, result) => {
    });
    
  });
  
  //const merchant = await MongoMerchant.findByIdAndUpdate(transaction.authorId,{})
}

User.addHook("afterCreate", denormalizeUser);
User.addHook("afterUpdate", denormalizeUser);

Merchant.addHook("afterUpdate", denormalizeMerchant);
Merchant.addHook("afterCreate", initCredentialsAfterCreate);

Credentials.addHook("afterUpdate",denormalizeCredentials )
// Credentials.addHook("afterCreate", denormalizeCredentials)

Transaction.addHook("afterCreate", denormaliezTransactions)
Transaction.addHook("afterUpdate", denormaliezTransactions)


module.exports = {
    User,
    Merchant,
    Credentials,
    Transaction
  };
