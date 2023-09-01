const express = require("express");

const routes = express.Router();

// Auth Route
routes.use("/auth", require("./Auth/auth.routes"));

// Products Route
routes.use("/products", require("./Products/products.routes"));

module.exports = routes;
