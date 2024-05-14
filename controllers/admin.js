const products = require("../models/products");
const assets = require("../utils/mockData");
const Admins = require("../models/Admins");

module.exports.getAdminHome = async(req, res, next)=>{
    const loginInfo = {
        isLogin : req?.session?.passport?.user ? true : false,
        role: req?.user?.role || ""
    }

    res.render("admin/home", {
        assets,
        result:undefined,
        Addform: undefined,
        product:undefined,
        loginInfo
    });
}

module.exports.getAdminAddForm = async(req, res, next)=>{
    const loginInfo = {
        isLogin : req?.session?.passport?.user ? true : false,
        role: req?.user?.role || ""
    }

    res.render("admin/home", {
        assets,
        result:undefined,
        Addform:true,
        product:undefined,
        loginInfo
    });
}

module.exports.getProductsAll = async (req, res, next)=>{
    const loginInfo = {
        isLogin : req?.session?.passport?.user ? true : false,
        role: req?.user?.role || ""
    }

    const {getProductCategoryWise} = require("../utils/mockData");
    const data = await getProductCategoryWise(products);
    
    res.render("admin/home", {
        assets,
        result:data,
        Addform:undefined,
        product:undefined,
        loginInfo
    });
}

module.exports.postProductsAdd = async(req, res, next)=>{
    const {name, price, description, reviews, seller, imageurl, category}  = req.body;
    await products.create({name, price, description, reviews, seller, imageurl, description});
    res.redirect("/admin/products/all");
}

module.exports.getProductUpdate = async(req, res, next)=>{
    const loginInfo = {
        isLogin : req?.session?.passport?.user ? true : false
    }

    const {id} = req.params; 
    const product = await products.findOne({_id:id});
    res.render("admin/home",{
        assets,
        result:undefined,
        Addform: undefined,
        product,
        loginInfo
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
    const loginInfo = {
        isLogin : req?.session?.passport?.user ? true : false,
        role: req?.user?.role || ""
    }

    res.render("admin/admin-login-form", {
        assets, 
        loginInfo
    });
}

module.exports.getAdminSignup = async(req, res, next)=>{
    const loginInfo = {
        isLogin : req?.session?.passport?.user ? true : false,
        role: req?.user?.role || ""
    }

    res.render("admin/admin-signup-form", {
        assets,
        loginInfo
    });
}

module.exports.postAdminSignup = async(req, res, next)=>{
    const loginInfo = {
        isLogin : req?.session?.passport?.user ? true : false,
        role: req?.user?.role || ""
    }

    const {name, email, password} = req.body;
    let admin = await Admins.findOne({email});
    if(admin){
        res.render("admin/admin-signup-form", {
            assets,
            message:"Email Already exist",
            loginInfo
        });
    }

    await Admins.create(
        {
            name, 
            email,
            password
        }
    );
    res.redirect("/admin/login");
}

module.exports.postAdminLogin = async(req, res)=>{
    console.log("hello");
    res.redirect("/");
}