import Order from "../models/order.model.js";
import { publishEvent } from "../utils/redis.js";

export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    const order = new Order({
      user: req.userId,
      items,
      totalAmount,
    });
    await order.save();

    publishEvent("ORDER_PLACED", {
      orderId: order._id,
      userId: req.userId,
      items,
      totalAmount,
    });

    res.status(201).json(order);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create order", error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    console.log(req.userId)
    const orders = await Order.findOne({ user: req.userId })
    res.json(orders);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to get orders", error: error.message });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.userId,
    }).populate("items.product");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to get order", error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    publishEvent("ORDER_STATUS_UPDATED", {
      orderId: order._id,
      status: order.status,
    });

    res.json(order);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to update order status", error: error.message });
  }
};
