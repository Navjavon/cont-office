import express from 'express';
import handler from './region.handler';

const router = express.Router();

router.post('/', handler.create);
router.get('/', handler.getAll);
router.put('/:id', handler.put);
router.delete('/:id', handler.delete);

export default router;
