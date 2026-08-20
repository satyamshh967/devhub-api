DevHub API

A production-oriented REST API for project management, built to explore real-world backend engineering concepts including authentication, authorization, validation, security, automated testing, API documentation, CI, and cloud deployment.

Current scope: DevHub is intentionally maintained as an intermediate backend portfolio project. The current version focuses on building a reliable REST API foundation. A larger collaborative SaaS expansion is documented separately as future work.

🚀 Live Demo

Live API: https://devhub-api-d5bg.onrender.com

Swagger / OpenAPI Documentation: https://devhub-api-d5bg.onrender.com/api-docs

GitHub: Add your repository URL here

📌 Project Overview

DevHub is a backend API for managing users and projects.

The project was built incrementally to understand how the components of a real backend application work together:

User authentication

JWT-based authorization

Secure password hashing

Project ownership

RESTful CRUD operations

Input and query validation

Pagination, search, filtering, and sorting

Centralized error handling

Rate limiting

Security headers

CORS configuration

Automated API testing

OpenAPI/Swagger documentation

MongoDB Atlas

Cloud deployment

Continuous Integration

The goal is not simply to implement CRUD endpoints, but to understand the engineering practices surrounding a production-oriented backend.

🛠️ Tech Stack

Backend

Node.js

Express.js

Mongoose

Database

MongoDB

MongoDB Atlas

Authentication & Security

JSON Web Tokens (JWT)

bcryptjs

Helmet

CORS

express-rate-limit

Testing

Jest

Supertest

Documentation

OpenAPI

Swagger UI

swagger-jsdoc

DevOps / Deployment

Git

GitHub

GitHub Actions

Render

✨ Current Features

1. User Authentication

Users can create accounts and authenticate using email and password.

Register

POST /auth/register

Example:

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Passwords are hashed before being stored in MongoDB.

2. JWT Authentication

A successful login generates a JWT.

POST /auth/login

Protected endpoints require:

Authorization: Bearer <JWT>

Authentication is handled through middleware before protected controllers are executed.

3. Project Management

Authenticated users can manage their projects.

Method

Endpoint

Purpose

GET

/projects

Get projects

GET

/projects/:id

Get a specific project

POST

/projects

Create a project

PUT

/projects/:id

Replace a project

PATCH

/projects/:id

Partially update a project

DELETE

/projects/:id

Delete a project

Projects currently contain:

name
status
createdAt
updatedAt

Valid statuses:

active
completed

4. Project Ownership

Projects are associated with authenticated users.

A user cannot access another user's project, preventing basic horizontal privilege escalation.

5. Pagination

Project listings support pagination.

Example:

GET /projects?page=2&limit=10

The response includes pagination metadata such as:

{
  "page": 2,
  "limit": 10,
  "total": 25,
  "pages": 3
}

6. Search

Projects can be searched by name.

GET /projects?search=study

Search is case-insensitive.

7. Filtering

Projects can be filtered by status.

GET /projects?status=active

8. Sorting

Projects support configurable sorting.

GET /projects?sort=-createdAt

9. Input Validation

The API validates project bodies and query parameters.

Examples of rejected input include:

Missing required fields

Empty project names

Invalid project status

Invalid page numbers

Invalid limits

Unsupported status filters

Incorrect field types

10. Centralized Error Handling

Errors are handled through centralized Express middleware.

The API returns consistent JSON error responses and handles common Mongoose errors such as:

Invalid MongoDB ObjectIds

Mongoose validation errors

Duplicate key errors

11. Rate Limiting

Authentication routes use stricter rate limiting to reduce brute-force attempts.

General API routes also have request limits to help prevent excessive requests.

12. Security Headers

Helmet is used to configure common HTTP security headers.

13. CORS

CORS is configured using an environment variable so the allowed frontend origin can be changed without modifying application code.

📖 API Documentation

DevHub provides interactive Swagger/OpenAPI documentation.

Local

http://localhost:3000/api-docs

Production

https://devhub-api-d5bg.onrender.com/api-docs

The documentation describes:

Available endpoints

HTTP methods

Request bodies

Query parameters

Authentication requirements

Response codes

Data schemas

🧪 Automated Testing

The API uses Jest and Supertest for automated HTTP testing.

The current test suite covers:

Authentication

Successful login

Invalid password

Missing credentials

Authorization

Unauthenticated requests

Valid JWT requests

Cross-user project access

Projects

Create

Read

Update

Partial update

Delete

Deleted resource handling

Validation

Invalid status

Missing project name

Invalid query parameters

Run:

npm test

🏗️ Project Architecture

devhub-api/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── config/
│   ├── db.js
│   └── swagger.js
│
├── controllers/
│   ├── authController.js
│   └── projectController.js
│
├── middleware/
│   ├── AppError.js
│   ├── asyncHandler.js
│   ├── authMiddleware.js
│   ├── errorHandler.js
│   ├── projectQueryValidation.js
│   └── projectValidation.js
│
├── models/
│   ├── User.js
│   └── Project.js
│
├── routes/
│   ├── authRoutes.js
│   └── projectRoutes.js
│
├── tests/
│   └── auth.test.js
│
├── app.js
├── server.js
├── package.json
├── package-lock.json
├── .env.example
└── README.md

🔄 Request Flow

A typical authenticated project request follows:

Client
  │
  ▼
Express
  │
  ▼
Security Middleware
  ├── Helmet
  ├── CORS
  └── Rate Limiting
  │
  ▼
Authentication Middleware
  └── Verify JWT
  │
  ▼
Validation Middleware
  │
  ▼
Route
  │
  ▼
Controller
  │
  ▼
Mongoose
  │
  ▼
MongoDB Atlas
  │
  ▼
Response

Errors are passed to centralized error-handling middleware.

🔐 Environment Variables

Create a local .env file.

Example:

MONGODB_URI=
JWT_SECRET=
CLIENT_URL=http://localhost:5173
PORT=3000

Never commit the actual .env file.

Use .env.example as the configuration template.

💻 Running Locally

1. Clone the repository

git clone <your-github-repository-url>
cd devhub-api

2. Install dependencies

npm install

3. Configure environment variables

Create:

.env

using:

.env.example

as a reference.

Add your MongoDB connection string and JWT secret.

4. Start the server

npm start

The API will run on:

http://localhost:3000

Swagger:

http://localhost:3000/api-docs

🧪 Running Tests

Run the complete test suite:

npm test

The tests are also executed through GitHub Actions on pushes to main and pull requests targeting main.

☁️ Deployment

The API is deployed using Render.

The database is hosted using MongoDB Atlas.

Production architecture:

GitHub
   │
   ▼
GitHub Actions
   │
   ▼
Render
   │
   ▼
Express API
   │
   ▼
MongoDB Atlas

Environment variables are configured directly in the deployment environment and are not committed to Git.

🔄 CI/CD

GitHub Actions runs the automated test suite on:

Pushes to main

Pull requests targeting main

Pipeline:

Code Change
    │
    ▼
Git Push / Pull Request
    │
    ▼
GitHub Actions
    │
    ▼
Install Dependencies
    │
    ▼
Run Jest Tests
    │
    ├── ❌ Failure
    │       ↓
    │    Fix code
    │
    └── ✅ Success

🗺️ Future Roadmap

The following features are intentionally not part of the current intermediate version. They represent a possible future expansion if DevHub is later developed into a complete collaborative SaaS platform.

Phase 1 — Collaboration

Project members

Team invitations

User roles

Role-based permissions

Team management

Phase 2 — Task Management

Create tasks

Assign tasks to users

Task priorities

Task deadlines

Task statuses

Kanban board

Task filtering and sorting

Phase 3 — Collaboration Features

Project comments

Task comments

User mentions

Notifications

Activity feed

Project audit logs

Phase 4 — Advanced Backend

API versioning

Refresh tokens

Email verification

Password reset

Advanced role-based access control

Background jobs

Caching

Redis integration

Phase 5 — Frontend

React frontend

Authentication UI

Project dashboard

Project management interface

Kanban task board

User/team management

Responsive design

Dark mode

Phase 6 — AI Features

AI project assistant

Automatic task generation

Project summarization

Task prioritization

AI-powered project search

Natural-language project queries

Phase 7 — SaaS Expansion

Organization/workspace system

Multi-tenant architecture

Subscription plans

Usage limits

Billing integration

Admin dashboard

Usage analytics

These features are intentionally deferred. The current project remains focused on building a strong backend engineering foundation.

🎯 Learning Objectives

This project was built to gain practical experience with:

Designing REST APIs

Express.js architecture

MongoDB data modeling

Authentication and authorization

JWT

Password hashing

Middleware design

Input validation

API security

Error handling

Automated testing

API documentation

Git workflows

CI/CD

Cloud deployment

📈 Project Status

Current Version — v1.0

Intermediate Backend API

Area

Status

Core API

✅

Authentication

✅

Authorization

✅

CRUD

✅

Validation

✅

Security

✅

Testing

✅

Swagger/OpenAPI

✅

MongoDB Atlas

✅

Deployment

✅

CI/CD

🚧

The current version intentionally stops at the intermediate-project scope.

Future roadmap items are documented as potential expansion rather than implemented functionality.

👨‍💻 Author

Satyam Sharma

Built as a hands-on backend engineering project focused on learning through implementation.

License

This project is currently intended as a personal learning and portfolio project.