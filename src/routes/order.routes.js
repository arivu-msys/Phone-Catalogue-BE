import express from 'express';
import { placeOrder } from '../controllers/order.controller.js';
import authMiddleware from '../auth.middleware.js';

const router = express.Router();

// POST / -> place an order (protected endpoint)
router.post('/', authMiddleware, placeOrder);

export default router;
