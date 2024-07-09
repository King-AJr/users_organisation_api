
# USERS_ORGANISATION_API README

## Overview

This project provides a comprehensive solution for managing users and organisations via a RESTful API. It includes functionalities for user registration, authentication, organisation management, and access control.

## Features

- **User Management**: Register new users, authenticate users via login, and manage user profiles.
- **organisation Management**: Create new organisations and manage memberships.
- **Access Control**: Ensure users can only access data within their organisation.

## Technologies Used

- **Backend Framework**: Node.js with Express.js
- **Database**: PostgreSQL with TypeORM for ORM operations
- **API Testing**: Jest for testing
- **Environment Management**: dotenv for environment variables
- **Other Libraries**: bcrypt for password hashing, JWT for authentication tokens

## Installation

To run the project locally, follow these steps:

1. Clone the repository from GitHub.
2. Install dependencies using `npm install`.
3. Set up your PostgreSQL database and configure the connection details in a `.env` file.
4. Start the server using `npm start`.

## File Structure

```
- controllers/
  - addUserToOrganisation.js
  - createOrganisation.js
  - getSingleOrganisation.js
  - getUserInfo.js
  - getUsersOrganisation.js
  - loginController.js
  - registerController.js
- db/
  - entity/
  - migration/
  - database.js
- middlewares/
 - jwtMiddleware.js
- routes/
  - authRoutes.js
  - organisationsRoutes.js
  - userInfoRoutes.js
- services/
  - addUserToOrgService.js
  - createOrgService.js
  - getSingleOrganisationService.js
  - getUserInfoService.js
  - loginService.js
  - registerUserService.js
- tests/
  - auth.spec.js
  - createToken.test.js
  - getUserInfo.test.js
- utils/
  - checkEmailExist.js
  - createToken.js
  - emptyFields.js
  - getTokenFromHeader.js
  - validateEmail.js
- server.js
- ormconfig.js
- README.md
- .env
- package.json
- .gitignore
```

## Components

- **Node.js with Express.js**: Backend server framework for handling HTTP requests and routing.
- **PostgreSQL**: Relational database used for storing user and organisation data.
- **TypeORM**: ORM library for TypeScript and JavaScript for database interaction and schema management.
- **Jest**: Library for integration testing of API endpoints.
- **bcrypt**: Library for password hashing.
- **JWT**: Library for generating authentication tokens.

## How the Program Works

### User Registration and Authentication

- **Register Endpoint (`POST /auth/register`)**:
  - Allows users to create a new account by providing details like `firstName`, `lastName`, `email`, `password`, and `phone`.
  - Validates input data and hashes the password for security before storing it in the database.

- **Login Endpoint (`POST /auth/login`)**:
  - Authenticates users by comparing the provided `email` and `password` with stored credentials.
  - returns user data and a JSON Web Token (JWT) upon successful login, used for subsequent authenticated requests.

### organisation Management

- **View currently signed in user organisation Endpoint (`GET /organisations`)**:
  - Responds with the organisation details of the currently signed in user.

- **Create organisation Endpoint (`POST /organisations`)**:
  - Enables the creation of new organisations with a `name` and optional `description`.
  - Ensures each organisation is uniquely identified and can be associated with multiple users.

- **Add User to organisation Endpoint (`POST /organisations/:orgId/users/:userId`)**:
  - Allows users to be added to existing organisations based on `userId` and `orgId`.
  - Validates the requester's authority to modify organisation membership i.e you can not add someone to an organisation you're part of.

### Access Control and Authorization

- **User Information Endpoint (`GET /users/:userId`)**:
  - Retrieves detailed information about a user based on `userId`.
  - Validates that the requester belongs to the same organisation as the requested user before providing access.