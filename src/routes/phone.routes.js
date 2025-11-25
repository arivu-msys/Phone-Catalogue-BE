import express from 'express';
import { getPhones } from '../controllers/phone.controller.js';

const router = express.Router();

// GET / -> returns the phones JSON data
router.get('/', getPhones);

export default router;
