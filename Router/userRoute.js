const express = require("express");
const router = express.Router();
const addToCart = require("../Controller/userController");

router.post("/login", addToCart.login);
router.post("/register", addToCart.register);

module.exports = router;
