import express from 'express';
import handler from './complaint.handler';

const router = express.Router();

router.post('/', handler.create);
router.get('/', handler.getAll);
router.get('/deleted/:page', handler.getAllDeleted);
router.get('/newnumber', handler.getNewNumber);
router.get('/report/full', handler.getFullReport);
router.get('/report/short', handler.getShortReport);
router.get('/:id', handler.get);
router.delete('/:id', handler.delete);
router.put('/:id', handler.put);

export default router;
