const express = require("express");
const router = express.Router();
const CartController  = require('../Controller/cartController')

router.post("/cart", CartController.addProductToCart);


module.exports = router;
