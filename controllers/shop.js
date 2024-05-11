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
    res.redirect("/shop");
}

module.exports.showCart = async(req, res, next)=>{
    let items = await users.findOne({_id:"662aec3e260d77c5c1117b7c"}).populate("cart.id");
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
        totalPrice
    });
}

module.exports.getCartIncrement = async(req, res, next)=>{
    const {id} = req.params;
    // console.log(id);
    let items = await users.findOne({_id:"662aec3e260d77c5c1117b7c"}).populate("cart.id");

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
    let items = await users.findOne({_id:"662aec3e260d77c5c1117b7c"}).populate("cart.id");

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
    let cart = await users.findOne({_id:"662aec3e260d77c5c1117b7c"}).populate("cart.id");
    cart = cart.cart;
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

    console.log(obj);

    order.push(obj);
    req.user.cart = [];
    req.user.save();
    res.send({
        message:"Order placed successfully"
    })
}