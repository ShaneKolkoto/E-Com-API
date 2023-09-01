const bcrypt = require("bcryptjs");

const { sign } = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

function createToken(user) {
  return sign(
    {
      user,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "365d",
    }
  );
}

async function hashPsw(psw) {
  return new Promise(async (resolve, reject) => {
    try {
      let salt = await bcrypt.genSalt(10);
      if (salt) {
        let hash = await bcrypt.hash(psw, salt);
        return resolve(hash);
      }
    } catch (err) {
      return reject(false);
    }
  });
}

async function comparePsw(psw1, psw2) {
  const isMatch = await bcrypt.compare(psw1, psw2);
  if (!isMatch) {
    return false;
  } else {
    return true;
  }
}

async function isEmail(email) {
  // Regular expression pattern for email validation
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the pattern
  return emailPattern.test(email);
}

async function sendEmail(to, subject, text) {
  let validEmail = await isEmail(to);
  if (!validEmail) {
    return "Email provided does not meet the requirements";
  } else {
    // Create a transporter using Ethereal Email SMTP credentials
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "jolie79@ethereal.email",
        pass: "T4RZ648ZzCzXcsEEd4",
      },
    });

    // Configure the email options
    const mailOptions = {
      from: "jolie79@ethereal.email",
      to,
      subject,
      html: text.html,
    };
    console.log(mailOptions);

    return new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          reject(error);
        } else {
          // resolve(success);
          transporter.sendMail(mailOptions, (error, info) => {
            // console.log(error);
            // console.log(error);
            if (error) {
              reject(error); // Failed to send email
            } else {
              resolve(info); // Email sent successfully
            }
          });
        }
      });
    });
  }
}

module.exports = {
  createToken,
  hashPsw,
  comparePsw,
  isEmail,
  sendEmail,
};
