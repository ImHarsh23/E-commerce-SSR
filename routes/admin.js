const express = require("express");
const router = express.Router();

const {getProductsAll, postProductsAdd, getAdminHome, getAdminAddForm, getProductUpdate, postProductUpdate, getProductDelete, getAdminLogin, getAdminSignup, postAdminSignup, postAdminLogin} = require("../controllers/admin"); 

router.get("/", getAdminHome);

//Send all product
router.get("/products/all", getProductsAll);

//Add
router.get("/products/add", getAdminAddForm);

router.post("/products/add", postProductsAdd);

//Update 
router.get("/products/update/:id", getProductUpdate);

router.post("/products/update/:id", postProductUpdate);

//Delete
router.get("/products/delete/:id", getProductDelete);

//login and signup page for admin
router.get("/login", getAdminLogin);

router.get("/signup", getAdminSignup);

//login and signup for admin

router.post("/login", require("../middleware/admin-local-strategy"), postAdminLogin);

router.post("/signup", postAdminSignup);

module.exports = router;