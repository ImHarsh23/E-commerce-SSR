//for user

const express = require("express");
const router = express.Router();

const {showProduct, getDetails, AddToCartById, showCart, getCartIncrement, getCartDecrement, getCartBuy, loginPage, signupPage, postUsersignup, postUserLogin, getUserLogout, getAuthGoogleCallback} = require("../controllers/shop");

router.get("/", showProduct);

router.get("/details/:id", getDetails);

router.get("/cart/add/:id", AddToCartById);

router.get("/cart", showCart);

router.get("/cart/increment/:id", getCartIncrement);

router.get("/cart/decrement/:id", getCartDecrement);

router.get("/cart/buy", getCartBuy);

router.get("/user/login", loginPage);

router.post("/user/login", require("../middleware/local-strategy"), postUserLogin);

router.get('/user/logout', getUserLogout);

router.get("/user/signup", signupPage);

router.post("/user/signup", postUsersignup);


//google login 

router.get("/user/login/google", require("../middleware/user-google-strategy").authenticate);

router.get("/auth/google/callback", require("../middleware/user-google-strategy").authenticateCallback, getAuthGoogleCallback);

module.exports = router;