const express = require("express");
const router = express.Router();

const {getProductsAll, postProductsAdd, getAdminHome, getAdminAddForm, getProductUpdate, postProductUpdate, getProductDelete} = require("../controllers/admin"); 

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

module.exports = router;