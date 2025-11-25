import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { users } from '../config/users.js';

// Helpers to resolve the public/login.html path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve the login HTML file. If an error message query param is present, the client
// side script in the HTML will display it.
export function serveLoginPage(req, res) {
  // Send the static HTML file from backend-api/public/login.html
  res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
}

// Handle POST /login from the form. Validates credentials using bcrypt against
// the in-memory users list. On success, issues a JWT and redirects to the
// front-end at http://localhost:4200. On failure, redirect back to the login
// page with a query param that indicates an error message.
export async function handleLogin(req, res) {
  const { username, password } = req.body || {};

  if (!username || !password) {
    // Redirect back with error indicator so the page shows a message
    return res.redirect('/?error=1');
  }

  // Find the user in the in-memory store
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.redirect('/?error=1');
  }

  // Compare supplied password with stored bcrypt hash
  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return res.redirect('/?error=1');
  }

  // Create JWT payload and sign token
  const payload = { id: user.id, username: user.username };
  const secret = process.env.JWT_SECRET || 'changeme';
  const token = jwt.sign(payload, secret, { expiresIn: '1h' });
  // In this flow we redirect to the frontend. If you want the frontend to
  // receive the token, you can set it as a cookie or include it as a query
  // parameter. For now we simply redirect to http://localhost:4200
  // NOTE: Do not expose tokens in URLs in production. Use secure cookies instead.
  return res.redirect(`http://localhost:4200?token=${token}`);
}
