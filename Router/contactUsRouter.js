const express = require("express");
const router = express.Router();
const Contact = require('../Controller/contactUsController')

router.post("/contact", Contact.postContact);


module.exports = router;
