const express = require("express");
const router = express.Router();
const ProductController = require('../Controller/productController')

router.get("/product", ProductController.getAllProducts);
router.post("/product", ProductController.createProduct);
router.put("/product/:id", ProductController.updateProduct);
router.delete("/product/:id", ProductController.deleteProduct);


module.exports = router;
