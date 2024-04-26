const assets = require("../utils/mockData");
const products =  require("../models/products");
const users = require("../models/users"); 

module.exports.showProduct = async(req, res, next)=>{
    const {getProductCategoryWise} = require("../utils/mockData");
    const data = await getProductCategoryWise(products);
    res.render("user/home",{
        assets,
        result:data,
        productDetails:false
    });
}

module.exports.getDetails = async (req, res, next)=>{
    const {id} = req.params;
    const product = await products.findById({_id: id});

    res.render("user/home",{
        assets,
        result:undefined,
        productDetails:true,
        product
    });
}

module.exports.AddToCartById = async(req, res, next)=>{
    const {id} = req.params;
    let userCart = req.user.cart;
    console.log(userCart);
    let index = -1;

    userCart.forEach((element, i) => {
        if(element.id == id){
            index = i;
        }
    });

    if(index == -1){
        console.log("Not copy");
        userCart.unshift({
            id:id,
            qty:1
        });
    }
    else{
        console.log("copy");
        userCart[index].qty = userCart[index].qty + 1;
    }

    //to make sure that db me change ho jaae so we need to save it.
    req.user.save();
    res.redirect("/shop");
}

module.exports.showCart = async(req, res, next)=>{
    let items = await users.findOne({_id:"662aec3e260d77c5c1117b7c"}).populate("cart.id");
    items = items.cart;
    let totalPrice = 0;
    items.forEach((item)=>{
        totalPrice += item.id.price * item.qty; 
    })
    res.render("user/cart", {
        assets,
        items, 
        totalPrice
    });
}