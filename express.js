const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

//HTTPS Configuration
const https = require('https');
const fs = require('fs');
const httpsServer = https.createServer({
    key: fs.readFileSync('../etc/letsencrypt/live/ethancantrell.dev/privkey.pem'),
    cert: fs.readFileSync('../etc/letsencrypt/live/ethancantrell.dev/fullchain.pem'),
  }, app);

//HTTP Configuration
const http = require('http');
const httpServer = http.createServer(app);
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

// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
// })
httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});

httpServer.listen(80, () => {
    console.log('HTTP Server running on port 80');
});
