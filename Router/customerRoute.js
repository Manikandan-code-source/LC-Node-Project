const express = require("express");
const router = express.Router();
const customerController = require("../Controller/customerController");

router.post("/login", customerController.login);
router.post("/register", customerController.register);

module.exports = router;
