// Small Express app that serves a login page and handles form-based authentication
// Uses ES modules and reads configuration from environment variables via dotenv
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import authRouter from '../src/routes/auth.routes.js';
import phoneRouter from '../src/routes/phone.routes.js';
import authMiddleware from './auth.middleware.js';

// Load environment variables from .env (if present)
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Enable CORS for development. Configure origins as needed in production.
app.use(cors());

// Parse URL-encoded bodies (form submissions)
app.use(express.urlencoded({ extended: false }));

// Parse JSON bodies (for any JSON endpoints)
app.use(express.json());

// Serve static files from the public folder (login page assets can go here)
app.use(express.static(join(__dirname, 'public')));

// Mount auth routes at the site root
app.use('/', authRouter);

// Mount phone API routes under /api/phones
// This makes the GET /api/phones endpoint available publicly
app.use('/api/phones', authMiddleware, phoneRouter);

// Simple health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server using PORT from env or default 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend-api listening on http://localhost:${PORT}`);
});

export default app;
