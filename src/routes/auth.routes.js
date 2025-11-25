import express from 'express';
import { serveLoginPage, handleLogin } from '../controllers/auth.controller.js';

const router = express.Router();

// Serve the login page at root
router.get('/', serveLoginPage);

// Handle form POST from the login page
router.post('/login', handleLogin);

export default router;
