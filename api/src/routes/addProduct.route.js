import express from 'express';
import { addProduct } from '../controllers/addProduct.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/addProduct', verifyToken, addProduct);

export default router;