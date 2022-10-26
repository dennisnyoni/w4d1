//importing core modules
const express = require('express');
const path = require('path');
const app = express();

const session = require('express-session');

//importing my custom modules
const routeHandler = require('./routeHandlers');

//configuration
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'view'));// to fetch the ejs template
app.set('port',process.env.PORT || 9090);
const port = app.get('port');

//middlewares of express
app.use('/css', express.static(path.join(__dirname,"css"))); // to fetch the css static
app.use(express.urlencoded()); // the middleware that is used to parse the post body


app.use(session({
    secret: 'salt for cookie signing',
  }));

//routing using POST and GET
app.get('/',routeHandler.homePage);
app.get('/shoppingcart', routeHandler.itemsInCart);
app.post('/addToCart',routeHandler.productDetails);

app.get('/tomato',routeHandler.registerItem);
app.get('/banana',routeHandler.registerItem);
app.get('/pumpkin',routeHandler.registerItem);

app.listen(port,routeHandler.serverMessage);
