import moment from 'moment';
import {Shortcuts} from '@/store/shortcuts';
moment.locale('ru');

export default (value: number) => (
    new Date(value).toISOString().substr(0, 10)
);

export interface IShortcutReturn {
    first: string;
    last: string;
}

const FORMAT = 'YYYY-MM-DD';

export const getFirstAndLastDay = (shortcut: Shortcuts): IShortcutReturn => {
    let first;
    let last;

    switch (shortcut) {
        case Shortcuts.currentWeek: {
            first = moment().startOf('isoWeek').format(FORMAT);
            last = moment().endOf('isoWeek').format(FORMAT);
            break;
        }

        case Shortcuts.lastWeek: {
            first = moment().subtract(1, 'weeks').startOf('isoWeek').format(FORMAT);
            last = moment().subtract(1, 'weeks').endOf('isoWeek').format(FORMAT);
            break;
        }

        case Shortcuts.currentMonth: {
            first = moment().startOf('months').format(FORMAT);
            last = moment().endOf('months').format(FORMAT);
            break;
        }

        case Shortcuts.lastMonth: {
            first = moment().subtract(1, 'months').startOf('months').format(FORMAT);
            last = moment().subtract(1, 'months').endOf('months').format(FORMAT);
            break;
        }

        case Shortcuts.currentYear: {
            first = moment().startOf('years').format(FORMAT);
            last = moment().endOf('years').format(FORMAT);
            break;
        }

        case Shortcuts.lastYear: {
            first = moment().subtract(1, 'years').startOf('years').format(FORMAT);
            last = moment().subtract(1, 'years').endOf('years').format(FORMAT);
            break;
        }
    }

    return {
        first,
        last
    };
};

export const formattedDate = (date: string) => {
    return date ? moment(date).format('Do MMMM YYYY') : '';
};
