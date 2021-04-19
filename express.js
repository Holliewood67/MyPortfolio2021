const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();


// Connect to database
mongoose.connect('mongodb://localhost/portfolio-projects', { useNewUrlParser: true, useUnifiedTopology: true  }, (err, data) => {
    if (err){
        console.log('DB connection failed.');
        return;
    }

    console.log('DB connection success!');
});


// Router Setup
const auth = require('./config/auth')(passport);
const home = require('./routes/home');
const portfolio = require('./routes/portfolio');
const admin = require('./routes/admin');
const login = require('./routes/login');
const addProject = require('./routes/addProject');
const addUser = require('./routes/addUser');

const app = express();
app.use(session({
    secret: 'ShhDontTell',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false}));

app.use('/', home);
app.use('/portfolio', portfolio);
app.use('/admin', admin);
app.use('/login', login);
app.use('/addProject', addProject);
app.use('/addUser', addUser);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
