const express = require("express");
const { getTable, getSingleItem } = require("../../../db/queries");
const productRoutes = express.Router();

// Product
productRoutes.get("/", async (req, res) => {
  try {
    let data = await getTable("products");
    if (data.length !== 0) {
      res.status(200).json({
        status: 200,
        data: data,
      });
    } else {
      res.status(400).json({
        status: 400,
        err: "Table Products is empty",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Single Product
productRoutes.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let data = await getSingleItem("products", "id", id);
    if (!data) {
      res.status(400).json({
        status: 400,
        err: `Product with id ${id} is not found`,
      });
    } else {
    }
    res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = productRoutes;
