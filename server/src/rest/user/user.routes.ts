import express from 'express';
import handler from '@/user/user.handler';

const router = express.Router();

router.post('/', handler.create);
router.get('/', handler.getAll);
router.put('/:username', handler.put);
router.delete('/:username', handler.delete);

export default router;
