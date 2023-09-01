const con = require("./dbConnect");
const util = require("util");
const query = util.promisify(con.query).bind(con);

async function getTable(tableName) {
  try {
    const result = await query(`SELECT * FROM ${tableName}`);
    return result;
  } catch (error) {
    throw new Error(`Error fetching data from ${tableName}: ${error.message}`);
  }
}

async function getSingleItem(tableName, row, id) {
  try {
    const result = await query(`SELECT * FROM ${tableName} WHERE ${row} = ?`, [
      id,
    ]);
    if (result.length === 0) {
      return false;
    }
    return result;
  } catch (error) {
    return error.message;
  }
}

async function deleteItem(tableName, id) {
  try {
    const result = await query(`DELETE FROM ${tableName} WHERE id = ?`, [id]);
    if (result.affectedRows === 0) {
      throw new Error(`Item with id ${id} not found in ${tableName}`);
    } else {
      return true;
    }
  } catch (error) {
    throw new Error(`Error deleting item from ${tableName}: ${error.message}`);
  }
}

async function updateItem(tableName, id, newData) {
  try {
    const result = await query(`UPDATE ${tableName} SET ? WHERE id = ?`, [
      newData,
      id,
    ]);
    if (result.affectedRows === 0) {
      throw new Error(`Item with id ${id} not found in ${tableName}`);
    } else {
      return true;
    }
  } catch (error) {
    throw new Error(`Error updating item in ${tableName}: ${error.message}`);
  }
}

async function insertItem(tableName, newItem) {
  try {
    const result = await query(`INSERT INTO ${tableName} SET ?`, [newItem]);
    return result.insertId;
  } catch (error) {
    return error.message;
  }
}

module.exports = {
  getTable,
  getSingleItem,
  deleteItem,
  updateItem,
  insertItem,
};
