import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import AccountService from '@/services/account.service';
import makeRoute from '@/utils/makeRoute';
import {Routes} from '@/store/routes';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    ...makeRoute(Routes.Login),
    meta: {
      allowAnonymous: true
    }
  },

  makeRoute(Routes.Desktop),

  makeRoute(Routes.DeletedComplaints),
  makeRoute(Routes.NewComplaint),
  makeRoute(Routes.Complaints),

  makeRoute(Routes.Suggestions),
  makeRoute(Routes.NewSuggestion),

  makeRoute(Routes.ComplaintReports),
  makeRoute(Routes.SuggestionReports),

  makeRoute(Routes.Users),
  makeRoute(Routes.Regions),
  makeRoute(Routes.ComplaintGroups),
  makeRoute(Routes.ComplaintStatuses),
  makeRoute(Routes.SuggestionGroups),
  makeRoute(Routes.ComplaintDeleteReasons),
  makeRoute(Routes.Departments),
  makeRoute(Routes.Company),
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach( async (to, from, next) => {
  const isAuthorised = await AccountService.isAuthorised();
  if (!isAuthorised && to.path !== Routes.Login) {
    next(Routes.Login);
  } else if (isAuthorised && to.path === Routes.Login) {
    next(Routes.Desktop);
  } else {
    next();
  }
});

export default router;
