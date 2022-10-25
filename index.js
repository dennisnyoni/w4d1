const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const port = 8084;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));
app.use(express.urlencoded());
app.use(cookieParser());
//app.use(express.json());
//app.use(bodyParser);
let cookie = Object();
let cookieArr = [];

app.get('/', (req, res) => {


    res.render('list');
});

app.post('/', (req, res) => {
    console.log("request body :" + req.body.cookieKey);
    let cookieKey = req.body.cookieKey;
    let cookieValue = req.body.cookieValue;
    //res.locals = { req.cookies.cookieKey: req.cookies.cookieValue };
    //if (cookieKey !== "" && cookieValue !== "") {
    res.cookie(cookieKey, cookieValue, { maxAge: 1000 * 60 * 60 * 24 * 7 });
    console.log("cookies :", req.cookies);
    cookie = { cookieKey: cookieValue };
    cookieArr.push(cookie);
    //}
    //res.render('list');
    res.redirect(303, '/');
});

app.listen(port);