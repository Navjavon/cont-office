import {Component} from 'vue-router/types/router';
import {Routes} from '@/store/routes';

import Login   from '@/views/Login/Login.vue';
import Desktop from '@/views/Desktop/Desktop.vue';

import Complaints        from '@/views/Complaints/Complaints.vue';
import NewComplaint      from '@/views/NewComplaint/NewComplaint.vue';
import DeletedComplaints from '@/views/DeletedComplaints/DeletedComplaints.vue';

import ComplaintReports  from '@/views/ComplaintReports/ComplaintReports.vue';
import SuggestionReports from '@/views/SuggestionReports/SuggestionReports.vue';

import NewSuggestion from '@/views/NewSuggestion/NewSuggestion.vue';
import Suggestions   from '@/views/Suggestions/Suggestions.vue';

import Users       from '@/views/Users/Users.vue';
import Company     from '@/views/Company/Company.vue';
import Regions     from '@/views/Regions/Regions.vue';
import Departments from '@/views/Departments/Departments.vue';
import ComplaintGroups   from '@/views/ComplaintsReason/ComplaintsReason.vue';
import ComplaintStatuses from '@/views/ComplaintsStatus/ComplaintsStatus.vue';
import SuggestionGroups  from '@/views/SuggestionGroups/SuggestionGroups.vue';
import ComplaintDeleteReasons from '@/views/DeleteReasons/DeleteReasons.vue';

interface IPage {
    name: string;
    component: Component;
}

export const Pages: Record<Routes, IPage> = {
    [Routes.Complaints]: {
        name: 'Ҳамаи шикоятҳо',
        component: Complaints
    },
    [Routes.NewComplaint]: {
        name: 'Шикояти нав',
        component: NewComplaint
    },
    [Routes.ActiveComplaints]: {
        name: 'Шикоятҳои фаъол',
        component: Complaints
    },
    [Routes.DeletedComplaints]: {
        name: 'Шикоятҳои несткардашуда',
        component: DeletedComplaints
    },

    [Routes.Suggestions]: {
        name: 'Ҳамаи пешниҳодҳо',
        component: Suggestions
    },
    [Routes.NewSuggestion]: {
        name: 'Пешниҳоди нав',
        component: NewSuggestion
    },

    [Routes.ComplaintReports]: {
        name: 'Ҷамъбасти шикоятҳо',
        component: ComplaintReports
    },
    [Routes.SuggestionReports]: {
        name: 'Ҷамъбасти пешниҳодҳо',
        component: SuggestionReports
    },

    [Routes.Users]: {
        name: 'Истифодабарандагон',
        component: Users
    },
    [Routes.Regions]: {
        name: 'Ноҳияҳо',
        component: Regions
    },
    [Routes.ComplaintGroups]: {
        name: 'Сабаби шикоятҳо',
        component: ComplaintGroups
    },
    [Routes.ComplaintStatuses]: {
        name: 'Ҳолати шикоятҳо',
        component: ComplaintStatuses
    },
    [Routes.ComplaintDeleteReasons]: {
        name: 'Сабабҳои хориҷкунӣ',
        component: ComplaintDeleteReasons
    },
    [Routes.SuggestionGroups]: {
        name: 'Гурӯҳи пешниҳодҳо',
        component: SuggestionGroups
    },
    [Routes.Departments]: {
        name: 'Шуъбаҳо',
        component: Departments
    },
    [Routes.Company]: {
        name: 'Корхона',
        component: Company
    },

    [Routes.Login]: {
        name: 'Логин',
        component: Login
    },
    [Routes.Desktop]: {
        name: 'Мизи корӣ',
        component: Desktop
    },
};
