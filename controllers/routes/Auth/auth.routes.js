const express = require("express");
const authRoute = express.Router();
const { Signup, Login, storeSignup } = require("./auth_functions");
const auth = require("../../../middleware/auth");

// Sign Up Route
authRoute.post("/signup", async (req, res) => {
  try {
    let body = req.body;
    let data = await Signup(body);
    if (data === true) {
      res.status(200).json({
        status: 200,
        msg: "Successfully Signed up",
      });
    } else {
      res.status(400).json({
        status: 400,
        error: data,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Store Sign Up Route
authRoute.post("/store-signup", auth, async (req, res) => {
  try {
    let body = req.body;
    let data = await storeSignup(body, req.user);
    if (!data) {
      res.status(400).json({
        status: 400,
        err: "Error: Server error please try again later",
      });
    } else {
      res.status(200).json({
        status: 200,
        data: "Store has been successfully created",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login Route
authRoute.post("/login", async (req, res) => {
  try {
    let body = req.body;
    let data = await Login(body);
    if (typeof data === "object") {
      res.status(200).json({
        status: 200,
        data: data,
      });
    } else {
      res.status(400).json({
        status: 400,
        error: data,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User Route
authRoute.use("/user", require("../Users/user.routes"));

// Store Route
authRoute.use("/store", require("../Store/store.routes"));

module.exports = authRoute;
