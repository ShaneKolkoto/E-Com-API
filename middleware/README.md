# JWT Authentication Middleware 
This README provides an explanation of a middleware function designed to handle JSON Web Token (JWT) authentication in a Node.js application. This middleware is responsible for verifying JWT tokens provided in the request headers and granting access to authenticated routes based on the validity of the token.

## Prerequisites
Before using this JWT authentication middleware, ensure that you have the following prerequisites:

1. A JWT library installed (e.g., jsonwebtoken).

## Usage
This middleware is designed to be used in your Express.js routes to protect specific routes or endpoints that require authentication.

```javascript
const auth = require('./auth.js');

// Example usage of the JWT authentication middleware:
app.get('/protected-route', auth, (req, res) => {
  // This route is protected and requires a valid JWT token for access.
  // If the token is valid, req.user will contain the decoded user information.
  // You can perform actions based on the authenticated user here.
});

```

> In the example above, the ``auth`` is used as middleware for the /protected-route. It checks for the presence of a valid JWT token in the request header (x-auth-token). If a valid token is found, it decodes the token and attaches the user information to the request object (req.user), allowing you to perform actions based on the authenticated user.
If the token is missing or invalid, the middleware responds with a 401 Unauthorized status and an appropriate error message.