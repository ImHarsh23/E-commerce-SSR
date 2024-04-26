const express = require("express");
const router = express.Router();

const {showProduct, getDetails, AddToCartById, showCart, getCartIncrement, getCartDecrement} = require("../controllers/shop")

router.get("/", showProduct);

router.get("/details/:id", getDetails);

router.get("/cart/add/:id", AddToCartById);

router.get("/cart", showCart);

router.get("/cart/increment/:id", getCartIncrement);

router.get("/cart/decrement/:id", getCartDecrement);


module.exports = router;