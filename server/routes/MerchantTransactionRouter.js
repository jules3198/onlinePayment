const { Router } = require("express");
const MerchantTransaction = require("../models/mongo/MerchantTransation");
const router = Router();


router.get("/:merchantId", (request, response) => {
    MerchantTransaction.find(request.params.merchantId)
        .then((data) => response.json(data))
        .catch((e) => response.sendStatus(500));
});


