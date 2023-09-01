const express = require("express");
const auth = require("../../../middleware/auth");

const { updateItem, getSingleItem } = require("../../../db/queries");
const { hashPsw, sendEmail } = require("../../_reusable");
require("dotenv").config();

const app = express.Router();

// Update Profile
app.put("/update-profile", auth, async (req, res) => {
  try {
    let { email, password } = req.body;
    let hash = await hashPsw(password);
    let user_obj = {
      email: email,
      password: hash,
    };
    let update = await updateItem("users", req.user.id, user_obj);
    if (typeof update === "boolean" && !update) {
      res.status(400).json({
        status: 400,
        err: update,
      });
    } else {
      res.status(200).json({
        status: 200,
        msg: "Profile updated successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      err: error.message,
    });
  }
});

// Forgot Password
app.post("/forgot-psw", async (req, res) => {
  try {
    let { email } = req.body;
    let user = await getSingleItem("users", "email", email);
    if (user.length > 0) {
      var mailData = {
        html: `<div>
                          <h3>Hi ${user[0].email},</h3>
                          <br>
                          <h4>Click link below to reset your password</h4>
                          <p><a href="localhost:3000/reset-pw/${user[0].id}">${user[0].id}</a><p>
                          <br>
                          <p>For any queries feel free to contact us...</p>
                          <div>
                              Email: ${process.env.MAILER_HOST}
                              <br>
                              Tel: ${process.env.MAILER_CONTACT}
                          <div>
                      </div>`,
      };
      let sentEmail = await sendEmail(email, "Forgot Password", mailData);
      if (sentEmail) {
        res.status(200).json({
          status: 200,
          msg: "Check your email provided for instruction.",
        });
      }
    } else {
      res.status(400).json({
        status: 400,
        err: "User can not be found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      err: error.message,
    });
  }
});

// Reset Password
app.put("/rest-psw/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let user = await getSingleItem("users", "id", id);
    if (user.length > 0) {
      let { password } = req.body;

      let newPass = {
        password: await hashPsw(password),
      };

      let update = await updateItem("users", user[0].id, newPass);
      if (typeof update === "boolean" && !update) {
        res.status(400).json({
          status: 400,
          err: update,
        });
      } else {
        res.status(200).json({
          status: 200,
          msg: "Password succesfully updated",
        });
      }
    } else {
      res.status(400).json({
        status: 400,
        err: "User can not be found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      err: error.message,
    });
  }
});

// Cart Route
app.use("/cart", require("./Cart/cart.routes"));

module.exports = app;
