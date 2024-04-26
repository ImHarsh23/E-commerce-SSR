const express = require("express");
const router = express.Router();

const {showProduct, getDetails, AddToCartById, showCart} = require("../controllers/shop")

router.get("/", showProduct);

router.get("/details/:id", getDetails);

router.get("/cart/add/:id", AddToCartById);

router.get("/cart", showCart);


module.exports = router;