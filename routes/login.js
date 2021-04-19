const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', (req, res, mext) => {
    res.render('login', null);
});

router.post('/', passport.authenticate('localLogin', {
    successRedirect: '/admin'
}))

module.exports = router;