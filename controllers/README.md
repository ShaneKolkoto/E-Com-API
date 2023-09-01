# Reusable Utility Functions

The ``__reusable.js`` module contains a set of reusable utility functions commonly used in web development, particularly for user authentication and email handling. These functions are designed to simplify common tasks and can be easily integrated into different parts of your application.

## Prerequisites
Before using these utility functions, ensure that you have the following prerequisites:

The necessary Node.js modules installed (e.g., ``bcryptjs``, ``jsonwebtoken``, ``nodemailer``, and ``dotenv``).

## Functions

Here's an overview of the utility functions provided by ``__reusable.js``:

1. ``createToken(user)``

- Generates a JSON Web Token (JWT) using the provided user object as the payload.
- Signs the token with a secret key specified in the environment variables.
- Sets an expiration time of 365 days for the token.

2. ``hashPsw(psw)``
- Asynchronously hashes a plain text password using bcrypt.
- Returns a promise that resolves with the hashed password or rejects with false in case of an error.

3. ``comparePsw(psw1, psw2)``
- Compares two passwords (psw1 and psw2) to check for a match.
- Returns true if the passwords match, false otherwise.

4. ``isEmail(email)``
- Validates an email address using a regular expression pattern.
- Returns true if the email is valid, false otherwise.

5. ``sendEmail(to, subject, text)``
- Sends an email using the provided email details.
- Verifies the email transporter and then sends the email.
- Returns a promise that resolves with information about the sent email or rejects with an error message in case of failure.