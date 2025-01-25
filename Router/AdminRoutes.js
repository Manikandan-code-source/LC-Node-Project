const express = require("express");
const router = express.Router();
const AdminController = require('../Controller/adminController')

router.get("/admin", AdminController.getCustomer);
router.post("/admin", AdminController.postCustomer);
router.put("/admin/:id", AdminController.updateCustomer);
router.delete("/admin/:id", AdminController.deleteCustomer);


module.exports = router;
