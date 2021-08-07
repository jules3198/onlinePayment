const Merchant = require("./models/mongo/Merchant");
const Transaction = require('./models/mongo/Transaction');
const User = require("./models/mongo/User");

new User({
    _id: 1,
    firstname: "Guillaume",
    lastname: "WELLE",
    username: "gwelle@myges.fr",
    password: "test1234",
    confirmed: "false",
    roles: "MerchantAuth"
})
    .save()
    .then((data) => console.log(data))

new User({
    _id: 2,
    firstname: "Victorien",
    lastname: "SOBELE",
    username: "vs@myges.fr",
    password: "test1234",
    confirmed: "false",
    roles: "MerchantAuth"
})
    .save()
    .then((data) => console.log(data))

new Merchant({
    _id : 1,
    societyName: "FSB",
    email: "gwelle@myges.fr",
    phoneNumber: '0656435678',
    reversionaryCurrency: 'EUR',
    password : "user",
    role : "MerchantAuth",
    adress: "4 rue Louis Blériot 94000 Créteil France",
    currency: 'EUR',
    confirmed: false
})
    .save()
    .then((data) => console.log(data))

new Merchant({
    _id : 2,
    societyName: "KGB",
    email: "vs@myges.fr",
    password : "test",
    role : "MerchantAuth",
    adress: "3 rue Louis Armand 75012 Paris France",
    telephone: parseInt('0756435678'),
    currency: 'EUR',
    confirmed: false
})
    .save()
    .then((data) => console.log(data))

let transac1 = new Transaction({
    _id : 1,
    merchant_id : 2,
    libelle: "Transacton n°1",
    facturationAdresse: "1 rue Bouvier 75011, Paris France",
    deliveryAdresse: "18 rue Bertrand Jean 13000, Marseille France",
    cart: ["Pull","Chemise"],
    currency: 'EUR',
    amount: parseInt('45')*parseInt('2')+ parseInt('60')*parseInt('3'),
    consumer: "Chris JERICHO",
    status : ["In Pending"]

})
    .save()
    .then((data) => console.log(data))

let transac2 =  new Transaction({
    _id : 2,
    merchant_id : 2,
    libelle: "Transacton n°2",
    facturationAdresse: "1 rue Bouvier 75011, Paris France",
    deliveryAdresse: "18 rue Bertrand Jean 13000, Marseille France",
    cart: ["Costume"],
    currency: 'BTN',
    amount: parseInt('85')*parseInt('1'),
    consumer: "Jean DUJARDIN",
    status : ["In Progress"]

})
    .save()
    .then((data) => console.log(data))

new TransactionsByMerchant({
    _id: 1,
    societyName: 'FSB',
    transactionId: 2,
    merchantId: 2,
    Transaction: [transac1,transac2]

})
    .save()
    .then((data) => console.log(data))
