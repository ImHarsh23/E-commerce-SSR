const assets = require("../utils/mockData");
const products =  require("../models/products");
const Users = require("../models/Users");

module.exports.showProduct = async(req, res, next)=>{
    const loginInfo = {
        isLogin : req?.session?.passport?.user ? true : false,
        role: req?.user?.role || ""
    }

    const {getProductCategoryWise} = require("../utils/mockData");
    const data = await getProductCategoryWise(products);
    res.render("user/home",{
        assets,
        result:data,
        productDetails:false,
        loginInfo
    });
}

module.exports.getDetails = async (req, res, next)=>{
    const loginInfo = {
        isLogin : req?.session?.passport?.user ? true : false,
        role: req?.user?.role || ""
    }

    const {id} = req.params;
    const product = await products.findById({_id: id});

    res.render("user/home",{
        assets,
        result:undefined,
        productDetails:true,
        product,
        loginInfo 
    });
}

module.exports.AddToCartById = async(req, res, next)=>{
    const {id} = req.params;
    console.log(req.user);
    let userCart = req.user.cart;
    let index = -1;

    userCart.forEach((element, i) => {
        if(element.id == id){
            index = i;
        }
    });

    if(index == -1){
        // console.log("Not copy");
        userCart.unshift({
            id:id,
            qty:1
        });
    }
    else{
        // console.log("copy");
        userCart[index].qty = userCart[index].qty + 1;
    }

    //to make sure that db me change ho jaae so we need to save it.
    req.user.save();
    res.redirect("/shop/cart");
}

module.exports.showCart = async(req, res, next)=>{
    const loginInfo = {
        isLogin : req?.session?.passport?.user ? true : false,
        role: req?.user?.role || ""
    }

    let items = req.user;
    items = items.cart;
    let totalPrice = 0;
    items.forEach((item)=>{
        totalPrice += item.id.price * item.qty; 
    })

    totalPrice = Math.round(totalPrice * 100) / 100;
    // console.log(items);
    res.render("user/cart", {
        assets,
        items, 
        totalPrice,
        loginInfo
    });
}

module.exports.getCartIncrement = async(req, res, next)=>{
    const {id} = req.params;
    // console.log(id);
    let items = req.user;

    items.cart.forEach((item)=>{
        if(item.id._id == id){
            // console.log(item);
            item.qty++;
        }
    })

    // console.log(items.cart);
    items.save();
    res.send(items.cart);
} 

module.exports.getCartDecrement = async(req, res, next)=>{
    const {id} = req.params;
    let items = req.user;

    items.cart.forEach((item, index)=>{
        if(item.id._id == id){
            item.qty--;
            if(item.qty == 0){
                items.cart.splice(index,1);
            }
        }
    })

    items.save();
    res.send(items.cart);
}

module.exports.getCartBuy = async(req, res, next)=>{
    let user = req.user;
    cart = user.cart;
    if(cart.length == 0){
        console.log("Hello");
        return res.send({
        message:"Add item first"
        })
    }
    let order = req.user.order;
    let obj ={
        products: [],
        totalPrice:0
    };

    let total_price = 0;

    cart.forEach((product)=>{
        obj.products.push(product);
        total_price += product.qty * product.id.price;
    })

    obj.totalPrice = total_price;
    
    order.unshift(obj);
    req.user.cart = [];
    req.user.save();
    // console.log(req.user);
    res.send({
        message:"Order placed successfully"
    })
}

module.exports.loginPage = async(req, res) => {
    const loginInfo = {
        isLogin : req?.session?.passport?.user ? true : false,
        role: req?.user?.role || ""
    }

    res.render("login", {
        assets,
        loginInfo
    });
}

module.exports.postUserLogin = async(req, res)=>{
    res.redirect("/");
}


module.exports.signupPage = async(req, res) => {
    const loginInfo = {
        isLogin : req?.session?.passport?.user ? true : false,
        role: req?.user?.role || ""
    }

    res.render("signup", {
        assets, 
        loginInfo
    });
}

module.exports.postUsersignup = async(req, res, next) => {
    const loginInfo = {
        isLogin : req?.session?.passport?.user ? true : false,
        role: req?.user?.role || ""
    }

    const {name, email, password} = req.body;
    let user = await Users.findOne({email});
    if(user){
        res.render("signup", {
            assets,
            message:"Email Already exist",
            loginInfo
        });
    }

    await Users.create(
        {
            name, 
            email,
            password
        }
    );
    res.redirect("/shop/user/login");
}

module.exports.getUserLogout = function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
}

module.exports.getAuthGoogleCallback = (req, res, next)=>{
    res.redirect("/");
}