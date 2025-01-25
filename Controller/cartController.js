const Cart = require("../Model/cartModel");
const Product = require("../Model/productModel");

const addProductToCart = async (req, res) => {
  const { customerId, productId, quantity } = req.body;

  if (!customerId || !productId || !quantity) {
    return res.status(400).json({ message: "Required Details are Missing" });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ customer: customerId });

    if (!cart) {
      cart = new Cart({ customer: customerId, items: [] });
    }

    // Check if the product is already in the cart
    const productIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (productIndex !== -1) {
      // If product is already in the cart, update the quantity
      cart.items[productIndex].quantity += quantity;
    } else {
      // If product isn't in the cart, add it
      cart.items.push({ product: productId, quantity });
    }

    // Save the cart to the database
    await cart.save();

    res.status(200).json({
      message: "Product added to cart successfully",
      cart,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {addProductToCart};