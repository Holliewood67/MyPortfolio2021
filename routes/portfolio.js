const express = require('express');
const router = express.Router();

const Project = require('../models/Project');


router.get('/', (req, res, mext) => {


        Project.find(null, (err, projects) => {
            const data = {
                projects: projects
            };
    
            res.render('portfolio', data);
    
        })
});

module.exports = router;