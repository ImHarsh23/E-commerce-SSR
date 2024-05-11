const express = require("express");
const router = express.Router();

const {homepage} = require("../controllers/home");

router.get("/", homepage);


module.exports = router;