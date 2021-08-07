const express = require('express');
const app = express();

// routers
const UserRouter = require("./routes/UserRouter");
const MerchantRouter = require("./routes/MerchantRouter");
const MailerRouter = require("./routes/MailerRouter");
const AdminRouter = require("./routes/AdminRouter");
const TransactionRouter = require('./routes/TransactionRouter');
const CredentialRouter = require('./routes/CredentialRouter');

const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
const verifyAuthorization = require("./middlewares/verifyAuthorization");
const createJWT = require("./lib/security").createJWT;
const User = require("./models/mongo/User");
const bcrypt = require("bcryptjs");


app.post("/login", (req, res) => {
    const { username, password } = req.body;
    User.findOne({username: username},(err,user) => {
      if(!user) {
        res.sendStatus(401);
      }else {
          user && bcrypt.compareSync(password, user.password) ? createJWT({ username }).then((token) => res.json({ token })) : res.sendStatus(401);
      }
    })
  });
// user
app.use("/users", UserRouter);


app.use(verifyAuthorization);
// merchant
app.use("/merchants", MerchantRouter);

// credentials
app.use("/credential",CredentialRouter)


// app.use("/users", UserRouter);
// app.use("/merchants", MerchantRouter);
app.use("/mailer", MailerRouter);
app.use("/admins", AdminRouter);
app.use("/transactions", TransactionRouter);

app.listen(process.env.PORT || 3001, () => console.log("Server listening"));
