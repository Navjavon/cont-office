import express from 'express';
import handler from './company.handler';

const router = express.Router();
router.get('/', handler.get);
router.put('/', handler.put);

export default router;
