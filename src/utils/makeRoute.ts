import {Routes} from '@/store/routes';
import {Pages} from '@/store/pages';

const getKeyName = (path: Routes) => (
    Object
        .keys(Routes)
        .find((key) => Routes[key] === path)
);

export default (route: Routes) => {
    const {name, component} = Pages[route];
    const path = route === Routes.Complaints ? '/complaints/:status' : route;

    return {
        path,
        name: getKeyName(route),
        meta: {
            name
        },
        component
    };
};
