const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/', (req, res, mext) => {
    // const user = req.user;

    // if (user == null){
    //     res.redirect('/login');
    //     return;
    // }

    // if (user.isAdmin == false){
    //     res.redirect('/login');
    //     return;
    // }

    res.render('addUser', null);
});

router.post('/', passport.authenticate('localRegister', {
    successRedirect: '/admin'
}));


module.exports = router;