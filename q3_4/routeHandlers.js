module.exports.homePage = (req, res) => {
    res.render('productList');
}
module.exports.registerItem = (req, res) => {
    res.render('registerItem');
}

module.exports.productDetails = (req,res) =>{
        const sessionData = req.session;
        if(sessionData.cart === undefined){
            sessionData.cart = [];
        }else{
            let found = false;
            sessionData.cart.forEach(item => {
                if (item.name === req.body.name) {
                    item.quantity = req.body.quantity,
                    item.price = req.body.price,
                    found = true;
                }
              });
            if(!found){ // it is new item to be added to the session object.
                sessionData.cart.push({
                    name : req.body.name,
                    quantity : req.body.quantity,
                    price : req.body.price,
                });
            }           
        }
        res.redirect(303,'/');
}
module.exports.itemsInCart = (req,res) =>{
    res.render('shoppingcart',{cart: req.session.cart});
}
module.exports.serverMessage = (err) => {
    if(err){
        console.log("Error:::"+err);
    }
    console.log(`Server is running on port 9090`);
}
