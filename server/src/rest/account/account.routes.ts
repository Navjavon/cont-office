import express from 'express';
import handler from './account.handler';

const router = express.Router();

router.get('/', handler.get);
router.put('/', handler.put);
router.put('/password', handler.updatePassword);
router.get('/logout', handler.logout);
router.post('/login', handler.login);

export default router;
