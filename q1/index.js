
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "view"));
app.set('port', process.env.PORT || 9090);
const port = app.get('port');

app.use(cookieParser());
app.use(express.urlencoded());

app.get('/', (req, res) =>{
    if(req.cookies.key){
        res.render('forgetCookie');
    }else{
        res.render('cookiePage', {cookies: req.cookies.data});
    }
});
app.post('/addCookie', (req, res) =>{
    if(req.cookies.data === undefined){
        req.cookies.data = [];
    }else{
        req.cookies.data.push({
            key:req.body.key,
            value:req.body.value,
        });
    }
    res.cookie(key, value, {maxAge: 1000*60*60*24});//24 hours   
    res.redirect('/');
})
app.listen(port, (err) => {
    if(err){
        console.log("Error: "+err);
    }else{
        console.log(`Server is running on port ${port}`);
    }
})