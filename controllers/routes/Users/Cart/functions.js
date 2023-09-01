const { getSingleItem, insertItem } = require("../../../../db/queries");

async function getCart(user) {
  let cart = await getSingleItem("cart", "user_id", user.id);
  if (!cart) {
    return "No cart data";
  } else {
    return cart;
  }
}

async function orderProduct(user, body) {
  let { items, total_cost } = body;

  if (typeof items !== "object") {
    return "Cart items does not meet requirements";
  } else {
    let cart_obj = {
      user_id: user.id,
      items: JSON.stringify(items),
      total_cost: total_cost,
    };
    let insert = await insertItem("cart", cart_obj);
    if (typeof insert === "number") {
      return true;
    }
  }
}

module.exports = {
  getCart,
  orderProduct,
};
