const express = require('express');
const router = express.Router();

router.get('/', (req, res, mext) => {
    const user = req.user;

    if (user == null){
        res.redirect('/login');
        return;
    }

    if (user.isAdmin == false){
        res.redirect('/login');
        return;
    }

    res.render('admin', null);
});

router.get('/logout', (req, res, next) =>{
    req.logout();
    res.redirect('/');
});


module.exports = router;