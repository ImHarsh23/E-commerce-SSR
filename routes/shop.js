//for user

const express = require("express");
const router = express.Router();

const {showProduct, getDetails, AddToCartById, showCart, getCartIncrement, getCartDecrement, getCartBuy} = require("../controllers/shop");

router.get("/", showProduct);

router.get("/details/:id", getDetails);

router.get("/cart/add/:id", AddToCartById);

router.get("/cart", showCart);

router.get("/cart/increment/:id", getCartIncrement);

router.get("/cart/decrement/:id", getCartDecrement);

router.get("/cart/buy", getCartBuy);

module.exports = router;