const assets = require("../utils/mockData");
const products =  require("../models/products");


module.exports.homepage = async(req, res)=>{
    const {getProductCategoryWise} = require("../utils/mockData");
    const data = await getProductCategoryWise(products);

    res.render("index", {
        assets,
        productDetails:false,
        result:data,
    });
}