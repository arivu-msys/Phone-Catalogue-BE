# Phone Catalogue - Backend (Express + JWT demo)

This is a small Node.js backend scaffold using Express and JWT authentication. It stores users in-memory (no database) and uses bcrypt for password hashing.

Prerequisites
- Node.js 18+ (or compatible)

Quick start
1. Copy the example environment file and set a secret:

   Copy `.env.example` to `.env` and set `JWT_SECRET`.

2. Install dependencies:

   npm install

3. Start in development mode (auto-restarts with changes):

   npm run dev

Running the login page (form-based)
1. Start the backend API which serves a simple login form:

  npm run dev

2. Open your browser to: http://localhost:3000

3. Enter one of the seeded users (see `src/config/users.js`). Example credentials in this demo:

  - username: arivu
  - password: arivu123

On successful login the server will redirect to http://localhost:4200. On failure the login page will reload and show the message: "Invalid user. Please provide correct username and password."

API Endpoints
- POST /api/auth/login
  - Body: { "username": "alice", "password": "password123" }
  - Returns: { "token": "<jwt>" }

- GET /api/public
  - Public endpoint, no auth required.

- GET /api/private
  - Protected endpoint. Requires header: Authorization: Bearer <token>

Example curl

Get token:

  curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d "{\"username\":\"alice\",\"password\":\"password123\"}"

Call private endpoint (replace <token>):

  curl http://localhost:3000/api/private -H "Authorization: Bearer <token>"

Notes
- This project uses ES module imports ("type": "module" in package.json).
- Users are stored in `src/config/users.js` and seeded with two users: `alice` and `bob`.
- The JWT secret must be set in `.env` as `JWT_SECRET`.
- The JWT secret must be set in `.env` as `JWT_SECRET`.
