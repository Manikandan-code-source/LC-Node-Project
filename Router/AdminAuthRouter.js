const express = require("express");
const router = express.Router();
const AdminAuthController = require('../Controller/adminAuthenticationController')

router.get("/admin/dashboard", AdminAuthController.DashboardData);


module.exports = router;
