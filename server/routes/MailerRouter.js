const { Router } = require("express");
const nodemailer = require('nodemailer');
const { EMAIL, PASSWORD } = require('../config.json');

const router = new Router();

router.post('/', (req, res) => {
    let transporter = nodemailer.createTransport({
        port: 465,               // true for 465, false for other ports
        host: "smtp.gmail.com",
        auth: {
            user: EMAIL,
            pass: PASSWORD,
        },
        secure: true,
    });

    let {to, subject, text} = req.body;

    let mailData = {
        from: EMAIL,  // sender address
        to: to,
        subject: subject,
        text: text,
        html: '<b>Merci de nous faire confiance ! </b> <br>Nous vous enverrons un mail dès qu\'un administateur confirmera votre inscription <br/>',
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            console.error(error);
        }

        res.status(200).send({
            message: "Mail envoyé",
            message_id: info.messageId
        })
    });
});

module.exports = router;
