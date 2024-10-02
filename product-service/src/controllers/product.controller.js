import Product from "../models/product.model.js";
import { publishEvent } from "../utils/redis.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, inventory } = req.body;
    const product = new Product({ name, description, price, inventory });
    await product.save();

    publishEvent("PRODUCT_CREATED", {
      productId: product._id,
      name,
      price,
      inventory,
    });

    res.status(201).json(product);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create product", error: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to get products", error: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to get product", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, inventory } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, inventory, updatedAt: Date.now() },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    publishEvent("INVENTORY_UPDATED", {
      productId: product._id,
      inventory: product.inventory,
    });

    res.json(product);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update product", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to delete product", error: error.message });
  }
};
