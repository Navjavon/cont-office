import express from 'express';
import handler from './suggestion.handler';

const router = express.Router();

router.post('/', handler.create);
router.get('/', handler.getAll);
router.get('/report/full', handler.getFullReport);
router.get('/report/short', handler.getShortReport);
router.put('/:id', handler.put);
router.delete('/:id', handler.delete);

export default router;
