const products = require("../models/products");
const assets = require("../utils/mockData");

module.exports.getAdminHome = async(req, res, next)=>{
    res.render("admin/home", {
        assets,
        result:undefined,
        Addform: undefined,
        product:undefined
    });
}

module.exports.getAdminAddForm = async(req, res, next)=>{
    res.render("admin/home", {
        assets,
        result:undefined,
        Addform:true,
        product:undefined
    });
}

module.exports.getProductsAll = async (req, res, next)=>{
    const {getProductCategoryWise} = require("../utils/mockData");
    const data = await getProductCategoryWise(products);
    
    res.render("admin/home", {
        assets,
        result:data,
        Addform:undefined,
        product:undefined
    });
}

module.exports.postProductsAdd = async(req, res, next)=>{
    const {name, price, description, reviews, seller, imageurl, category}  = req.body;
    await products.create({name, price, description, reviews, seller, imageurl, description});
    res.redirect("/admin/products/all");
}

module.exports.getProductUpdate = async(req, res, next)=>{
    const {id} = req.params; 
    const product = await products.findOne({_id:id});
    res.render("admin/home",{
        assets,
        result:undefined,
        Addform: undefined,
        product
    });
}

module.exports.postProductUpdate = async(req, res, next)=>{
    const {id} = req.params;
    const {name, price, description, seller, imageurl, category}  = req.body;
    console.log(category); 

    const product = await products.findById({_id:id});

    product.name = name;
    product.price = price;
    product.description = description;
    product.seller = seller;
    product.imageurl = imageurl;
    product.category = category;

    await product.save();

    res.redirect("/admin/products/all");
}

module.exports.getProductDelete = async(req, res, next)=>{
    const {id} = req.params;
    await products.deleteOne({_id: id});
    res.redirect("/admin/products/all");
}

module.exports.getAdminLogin = async(req, res, next)=>{
    res.render("admin/admin-login-form", {
        assets
    });
}

module.exports.getAdminSignup = async(req, res, next)=>{
    res.render("admin/admin-signup-form", {
        assets
    });
}