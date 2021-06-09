import {Routes} from '@/store/routes';
import {Pages} from '@/store/pages';

const makeNavbarItem = (route: Routes): INavbarBaseItem => {
  return {
    text: Pages[route].name,
    route
  };
};

export const navbarItems: INavbarComplexItem[] = [
  {
    icon: 'mdi-briefcase',
    ...makeNavbarItem(Routes.Desktop)
  },

  {
    icon: 'mdi-book-open',
    text: 'Шикоятҳо',
    route: '/complaints',
    items: [
      makeNavbarItem(Routes.NewComplaint),
      {
        ...makeNavbarItem(Routes.ActiveComplaints),
        count: 0
      },
      makeNavbarItem(Routes.Complaints),
      makeNavbarItem(Routes.DeletedComplaints)
    ]
  },

  {
    icon: 'mdi-email-newsletter',
    text: 'Пешниҳодҳо',
    route: '/suggestions',
    count: 0,
    items: [
      makeNavbarItem(Routes.NewSuggestion),
      makeNavbarItem(Routes.Suggestions),
    ]
  },

  {
    icon: 'mdi-file-document-outline',
    text: 'Ҳисоботҳо',
    route: '/reports',
    items: [
      makeNavbarItem(Routes.ComplaintReports),
      makeNavbarItem(Routes.SuggestionReports)
    ]
  }
];

export const settings = {
  icon: 'mdi-settings',
  text: 'Танзимот',
  route: '/settings',
  items: [
    makeNavbarItem(Routes.Users),
    makeNavbarItem(Routes.Regions),
    makeNavbarItem(Routes.Departments),
    makeNavbarItem(Routes.ComplaintGroups),
    makeNavbarItem(Routes.ComplaintStatuses),
    makeNavbarItem(Routes.SuggestionGroups),
    makeNavbarItem(Routes.ComplaintDeleteReasons),
    makeNavbarItem(Routes.Company)
  ]
};
