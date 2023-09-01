# Database Utility Functions
This README provides an explanation of a set of database utility functions designed to simplify database interactions in a Node.js application. These functions are intended to be used with a MySQL database, and they cover common operations like retrieving data, updating data, deleting records, and inserting new records. The utility functions are designed to handle errors gracefully and return meaningful results.

## Prerequisites
Before using these database utility functions, ensure that you have:

1. Node.js installed on your system.
2. A MySQL database set up and configured.
3. The necessary MySQL connection information in a `dbConnect.js` file.

`dbConnect.js`
```javascript
const mysql = require("mysql");
require("dotenv").config();

// Here to is use across multiple files. Used to make SQL queries to DB
const con = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  port: process.env.DBPORT,
  database: process.env.DBNAME,
  multipleStatements: true,
  connectionLimit: 50,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;

```

## Usage
You can now use these utility functions to interact with your MySQL database in your Node.js application.

```javascript
const {
  getTable,
  getSingleItem,
  deleteItem,
  updateItem,
  insertItem,
} = require('./dbFunctions');

// Example usage of the utility functions:

// Retrieve all records from a table
const allRecords = await getTable('your_table_name');

// Retrieve a single record by ID
const singleRecord = await getSingleItem('your_table_name', 'id', 1);

// Delete a record by ID
const isDeleted = await deleteItem('your_table_name', 2);

// Update a record by ID with new data
const isUpdated = await updateItem('your_table_name', 3, { key: 'new-value' });

// Insert a new record
const newRecordId = await insertItem('your_table_name', { key: 'value' });
```

> These functions return the requested data or status, and they handle errors gracefully. If an error occurs during database interaction, an error message is thrown, which you can catch and handle accordingly in your application.