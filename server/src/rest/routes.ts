import express from 'express';
import complaints  from '@/complaint/complaint.routes';
import suggestions from '@/suggestion/suggestion.routes';
import departments from '@/department/department.routes';
import status  from '@/status/status.routes';
import groups  from '@/group/group.routes';
import regions from '@/region/region.routes';
import users   from '@/user/user.routes';
import account from '@/account/account.routes';
import company from '@/company/company.routes';

const router = express.Router();

router.use('/users', users);
router.use('/complaints', complaints);
router.use('/suggestions', suggestions);
router.use('/status', status);
router.use('/groups', groups);
router.use('/regions', regions);
router.use('/departments', departments);
router.use('/account', account);
router.use('/company', company);

export default router;
