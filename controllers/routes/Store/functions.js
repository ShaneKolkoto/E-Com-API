const {
  getSingleItem,
  insertItem,
  deleteItem,
  updateItem,
} = require("../../../db/queries");

async function getStore(ownerId) {
  let store = await getSingleItem("stores", "owner_id", ownerId);
  if (store) {
    return store;
  } else {
    return "Do not have a store";
  }
}

async function verifyStore(ownerId, storeId) {
  let owner = await getStore(ownerId).then((data) => {
    return data[0].owner_id;
  });
  let product = await getSingleItem("products", "id", storeId).then((data) => {
    return data[0].store_id;
  });
  if (owner !== product) {
    return false;
  } else {
    return true;
  }
}

async function addProduct(body, user) {
  let owner = await getStore(user.id);

  if (owner[0].owner_id !== user.id) {
    return "Access Denied, you dont have rights to add to this store";
  } else {
    let {
      product_name,
      product_desc,
      product_img,
      product_price,
      product_qty,
    } = body;
    let product_obj = {
      store_id: owner[0].id,
      product_name: product_name,
      product_desc: product_desc,
      product_img: product_img,
      product_price: product_price,
      product_qty: product_qty,
    };

    let insert = await insertItem("products", product_obj);
    if (typeof insert === "number") {
      return true;
    }
  }
}

async function delProduct(id, user) {
  let verify = await verifyStore(user.id, id);
  if (!verify) {
    return "Access Denied, you do not have permission to delete products";
  } else {
    let owner = await getStore(user.id).then((data) => {
      return data[0].owner_id;
    });
    let product = await getSingleItem("products", "id", id).then((data) => {
      return data[0].store_id;
    });

    if (product !== owner) {
      return "Access Denied, you do not have rights to delete products from store";
    } else {
      let item = await deleteItem("products", id);
      if (item === true) {
        return item;
      }
    }
  }
}

async function updateProduct(id, user, body) {
  let verify = await verifyStore(user.id, id);
  if (!verify) {
    return "Do not have access to update product";
  } else {
    let {
      product_name,
      product_desc,
      product_img,
      product_price,
      product_qty,
    } = body;
    let product_obj = {
      store_id: user.id,
      product_name: product_name,
      product_desc: product_desc,
      product_img: product_img,
      product_price: product_price,
      product_qty: product_qty,
    };
    let update = await updateItem("products", id, product_obj);
    if (typeof update === "boolean" && !update) {
      return update;
    } else {
      return true;
    }
  }
}

async function updateStore(user, body) {
  let store = await getStore(user.id);
  // return store;
  if (store.length > 0) {
    let { store_name, store_logo } = body;
    let store_obj = {
      owner_id: user.id,
      store_name: store_name,
      store_logo: store_logo,
    };
    let update = await updateItem("stores", store[0].id, store_obj);
    if (typeof update === "boolean" && !update) {
      return update;
    } else {
      return true;
    }
  }
}

module.exports = {
  getStore,
  addProduct,
  delProduct,
  updateProduct,
  updateStore,
};
