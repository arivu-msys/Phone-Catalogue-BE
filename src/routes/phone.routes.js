import express from 'express';
import { getPhoneDetails, getPhones } from '../controllers/phone.controller.js';

const router = express.Router();

// GET / -> returns the phones JSON data
router.get('/', getPhones);

router.get('/:productId', getPhoneDetails);


export default router;
