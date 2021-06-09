import express from 'express';
import handler from './group.handler';

const router = express.Router();

router.post('/', handler.create);
router.get('/:type', handler.getAll);
router.put('/:id', handler.put);
router.delete('/:id', handler.delete);

export default router;
