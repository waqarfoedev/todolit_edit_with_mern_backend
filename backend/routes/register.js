const router = require('express').Router();
let User = require('../models/register.model');
let user = require('../models/register.model');

router.route('/').get((req, res) => {
    user.find().then((register) => res.json(register)).catch((err) => {
        res.status(400).json("Error:==" + err);
    });
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const repassword = req.body.repassword;
    const newUser = new User({
        username, email, password, repassword
    });
    newUser.save()
        .then(() => res.json('Register add'))
        .catch((err) => res.status(400)
            .json('Err from register route ::::' + err));

});


module.exports = router;