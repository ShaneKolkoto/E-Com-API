# E-Commerce API Documentation
<img align="right" alt="img" height="100px;" src="https://avatars.githubusercontent.com/u/93946405?v=4" />
Welcome to the documentation for the Express MySQL E-Commerce API. This API serves as the backend for our e-commerce platform, providing various functionalities to manage products, orders, and customers using a MySQL database. Please follow the instructions below to get started.

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

## Prerequisites
Before you begin, make sure you have the following prerequisites in place:

1. [Node.js](https://nodejs.org/en): The API is built using Node.js, so you'll need to have it installed on your system. You can download it from nodejs.org.

2. [MySQL](https://www.mysql.com/): The API uses MySQL as the database. Make sure you have a MySQL server up and running. You can download and install MySQL from mysql.com.

3. [Ethereal ](https://ethereal.email/): Ethereal Email is a service provided by Ethereal, a popular email testing and debugging platform for developers. It offers a sandboxed environment for sending and receiving emails during development and testing phases of an application.

## Installation
Follow these steps to install the API on your local machine:

1. Clone this repository to your local machine using:

```bash
git clone https://github.com/ShaneKolkoto/ecommerce-api.git
```
2. Navigate to the project directory:
```bash
cd ecommerce-api
```
3. Install the required Node.js packages using:
```bash
npm install
```
## Configuration
Before you start the API, you need to configure it with your environment-specific settings:

1. Create a .env file in the root directory of the project.

2. Copy the contents of .env.example into .env.

3. Edit the .env file and provide your MongoDB connection URL and the API key you obtained earlier.

Example .env file:

```env
DBHOST = your_database_host
DBUSER = your_database_user
DBPASSWORD = your_database_password
DBPORT = 3306
DBNAME = your_database_name

PORT = 3000

SECRET_KEY = your_secrete_here

MAILER_HOST = your_mailer_host (test@gmail.com)
MAILER_CONTACT = your_mailer_contact (+27 11 111 1111)

MAILER_USER = ethereal_user
MAILER_PASS = ethereal_password
```

## Starting the API
Once you've installed and configured the API, you can start it using the following command:

```bash
npm start
```

## Routes
### Product Routes
- `/api/products`
- `/api/products/:id`
    - req.params.id
### Users
- `/api/auth/login` (POST)
    - email, password
- `/api/auth/signup` (POST)
    - email, password
- `/api/auth/store-signup` (POST)
    - headers (x-auth-token)
    - store_name, store_logo
- `/api/auth/user/update-profile` (PUT)
    - header (x-auth-token)
    - email, password
- `/api/auth/user/forgot-psw` (POST)
    - email
- `/api/auth/user/reset-psw/:id` (PUT)
    - req.params.id
    - password
### Store Owner
- `/api/auth/store/add-product` (POST)
    - header (x-auth-token)
    - product_name, products_desc, product_img, product_price, product_qty
- `/api/auth/store/delete-product/:id` (DELETE)
    - req.params.id
- `api/auth/store/update-product/:id` (PUT)
    - req.params.id
    - product_name, products_desc, product_img, product_price, product_qty
- `api/auth/store/update-store/:id` (PUT)
    - header (x-auth-token)
    - store_name, store_logo
### Cart
- `/api/auth/user/cart`
    - headers (x-auth-token)
- `/api/auth/user/cart/order`
    - headers (x-auth-token)
    - items, total_cost 
    - type of items array

> The API will start running on http://localhost:3000.

## API Documentation
For detailed information about the available routes and endpoints, please refer to the API documentation. The documentation provides examples of requests and responses to help you understand how to interact with the API effectively.

For security reasons, please ensure that the API key is included in the request headers for every API call you make.

If you encounter any issues or have questions, please don't hesitate to contact our support team at <a href="mailto:shanekolkoto@gmail.com">shanekolkoto@gmail.com</a>.

Happy coding!