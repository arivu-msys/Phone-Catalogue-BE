import express from 'express';
import { placeOrder } from '../controllers/order.controller.js';

const router = express.Router();

// POST / -> place an order (protected endpoint)
router.post('/', placeOrder);

export default router;
