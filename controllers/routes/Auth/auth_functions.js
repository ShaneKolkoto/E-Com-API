const {
  getSingleItem,
  insertItem,
  updateItem,
} = require("../../../db/queries");
const {
  isEmail,
  hashPsw,
  createToken,
  comparePsw,
} = require("../../_reusable");

async function Signup(body) {
  let { email, password } = body;

  let validEmail = await isEmail(email);

  if (!validEmail) {
    return "Email provided is not valid";
  } else {
    let user = await getSingleItem("users", "email", email);
    if (user) {
      return "Already have an account";
    } else {
      let newUser = {
        email: email,
        password: await hashPsw(password),
        role: "user",
      };
      let insert = await insertItem("users", newUser);
      if (insert) {
        return true;
      }
    }
  }
}

async function Login(body) {
  let { email, password } = body;
  let user = await getSingleItem("users", "email", email);
  if (user) {
    // Compare Passswords
    let isMatch = await comparePsw(password, user[0].password);
    if (!isMatch) {
      return "Password does not match";
    } else {
      let token = await createToken(user[0]);
      let data = {
        token,
        user,
      };
      return data;
    }
  } else {
    return "Do not have an account";
  }
}

async function storeSignup(body, user) {
  let { store_name, store_logo } = body;
  let store_obj = {
    owner_id: user.id,
    store_name: store_name,
    store_logo: store_logo,
  };
  let user_obj = {
    role: "store_owner",
  };

  let update = await updateItem("users", user.id, user_obj);
  let insert = await insertItem("stores", store_obj);
  console.log(insert);
  if (typeof insert === "number" && update) {
    return true;
  } else {
    return false;
  }
}
module.exports = {
  Signup,
  Login,
  storeSignup,
};
