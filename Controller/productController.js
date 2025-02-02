const Product = require("../Model/productModel");

const createProduct = async (req, res) => {
  const { name, price, count, image, desc } = req.body;
  if (!name || !price || !count) {
    return res.status(400).json({ message: "Product details are missing" });
  }
  try {
    const product = new Product({
      name,
      price,
      count,
      image,
      desc
    });
    await product.save();
    res.status(201).json({
      product: {
        name: product.name,
        price: product.price,
        count: product.count,
        image: product.image,
        desc: product.desc
      },
      message: "Product has been added successfully!"
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, count, image, desc } = req.body;
  if (!name || !price || !count) {
    return res.status(400).json({ message: "Product details are missing" });
  }
  try {
    const updatedProductDetail = {
      name: name,
      price: price,
      count: count,
      image: image,
      desc: desc
    }
    const product = await Product.findByIdAndUpdate(id, updatedProductDetail, { new: true });
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    } else {
      res.status(200).json({ message: "Product updated successfully!", product });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    } else {
      res.json({ message: "Product deleted successfully!" });
    }
  }
  catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(201).json({
      message: "List of Available Products",
      products,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts
}
