const express = require('express');
const mongodb = require('mongodb');
const { db } = require('../models/Project');
const router = express.Router();

const Project = require('../models/Project');

//Main get router
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

    Project.find(null, (err, projects) => {
        const data = {
            projects: projects
        };

        res.render('admin', data);
    })
});

//Remove Project Router
router.get('/removeProject/:id', (req, res, next) => {
    db.collection('projects').deleteOne({_id: mongodb.ObjectID( req.params.id)}, (err, result) => {
        if (err) return console.log(err)
        console.log(req.body)
        res.redirect('/admin')
      })
});


//Logout Router
router.get('/logout', (req, res, next) =>{
    req.logout();
    res.redirect('/');
});


module.exports = router;