module.exports.logo = "https://cdn1.iconfinder.com/data/icons/logotypes/32/google-wallet-40.png";




module.exports.getProductCategoryWise = async(products)=>{
    let result = await products.find();

    const data = {};

    result.forEach((product)=>{
        let arr = data[product.category] || [];
        arr.push(product);

        data[product.category] = arr;
    })

    return data;
}