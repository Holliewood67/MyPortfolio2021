const express = require('express');
const router = express.Router();
const Project = require('../models/Project')

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


    res.render('addProject', null);
});

router.post('/', (req, res, next) => {
    Project.create(req.body, (err, project) =>{
        if (err){
            res.json({
                confirmation: 'Failed',
                error: err
            });
            return;
        }

        res.redirect('/admin');
    });
});


module.exports = router;