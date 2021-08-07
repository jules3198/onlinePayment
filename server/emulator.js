const express = require('express');
const emulator = express();
const cors = require("cors");

emulator.use(express.json());
emulator.use(express.urlencoded());
emulator.use(cors());

emulator.post("/confirmPayment", (req,
                                  res) => {

    //req.body doit recevoir normalement une demande de confirmation de paiement par la plateforme API
    // avec des informations du marchand (infos CB + prix + devise)
        console.log(req.body);
        setTimeout(async () => {
            await res.status(202).send('Successful payment confirmation');
        }, 10000);
});
emulator.listen(process.env.PORT || 3003, () => console.log("Emulator server listening on 3001"));
