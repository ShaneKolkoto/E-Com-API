const express = require("express");
const auth = require("../../../../middleware/auth");
const { getCart, orderProduct } = require("./functions");

const cartRoute = express.Router();

// Get Cart
cartRoute.get("/", auth, async (req, res) => {
  try {
    let cart = await getCart(req.user);
    if (typeof cart === "string") {
      res.status(400).json({
        status: 400,
        err: cart,
      });
    } else {
      res.status(200).json({
        status: 200,
        data: cart,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      err: error.message,
    });
  }
});

// Order
cartRoute.post("/order", auth, async (req, res) => {
  try {
    let body = req.body;
    let order = await orderProduct(req.user, body);
    if (typeof order !== "boolean") {
      res.status(400).json({
        status: 400,
        err: order,
      });
    } else {
      res.status(200).json({
        status: 200,
        msg: "Order has been placed successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      err: error.message,
    });
  }
});

module.exports = cartRoute;
