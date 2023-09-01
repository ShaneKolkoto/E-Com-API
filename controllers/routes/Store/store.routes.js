const express = require("express");
const auth = require("../../../middleware/auth");

const {
  addProduct,
  delProduct,
  updateProduct,
  updateStore,
} = require("./functions");

const storeRoute = express.Router();

// Add Product Route
storeRoute.post("/add-product", auth, async (req, res) => {
  if (req.user.role !== "store_owner") {
    res.status(400).json({
      status: 400,
      err: "Access Denined",
    });
  } else {
    let body = req.body;
    let product = await addProduct(body, req.user);
    console.log(product);
  }
});

// Delete Product Route
storeRoute.delete("/delete-product/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "store_owner") {
      res.status(401).json({
        status: 401,
        err: "Access Denied, You are authorized for this action",
      });
    } else {
      let id = req.params.id;
      let del = await delProduct(id, req.user);
      if (typeof del !== "boolean") {
        res.status(400).json({
          status: 400,
          err: del,
        });
      } else {
        res.status(200).json({
          status: 200,
          msg: "Product Successfully deleted.",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      status: 400,
      err: error.message,
    });
  }
});

// Update Product Route
storeRoute.put("/update-product/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "store_owner") {
      res.status(401).json({
        status: 401,
        err: "Access Denied, You are authorized for this action",
      });
    } else {
      let id = req.params.id;
      let body = req.body;
      let update = await updateProduct(id, req.user, body);
      if (typeof update === "boolean") {
        res.status(200).json({
          status: 200,
          msg: "Product successfully updated",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      status: 400,
      err: error.message,
    });
  }
});

// Update Store Route
storeRoute.put("/update-store", auth, async (req, res) => {
  try {
    if (req.user.role !== "store_owner") {
      res.status(401).json({
        status: 401,
        err: "Access Denied, You are authorized for this action",
      });
    } else {
      let body = req.body;
      let update = await updateStore(req.user, body);
      if (typeof update === "boolean") {
        res.status(200).json({
          status: 200,
          msg: "Store successfully updated",
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      err: error.message,
    });
  }
});

module.exports = storeRoute;
