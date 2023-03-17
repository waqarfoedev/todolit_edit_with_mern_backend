const router = require('express').Router();
let Login = require('../models/register.model');


router.route('/add').post((req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    Login.findOne({ email: email }, (err, user) => {
        if (user) {
            if (password == user.password) {
                res.send({ message: "Login Successful", user: user });
            } else {
                res.send({ message: "Password not match" });
            }
        } else {
            res.send({ message: "Please provide correct email and password" });
        }
    }).then((e) => {
        console.log(e);
    });
});

module.exports = router;