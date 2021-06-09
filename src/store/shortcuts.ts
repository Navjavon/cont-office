export enum Shortcuts {
    all = 'all',
    currentWeek = 'currentWeek',
    lastWeek = 'lastWeek',
    currentMonth = 'currentMonth',
    lastMonth = 'lastMonth',
    currentYear = 'currentYear',
    lastYear = 'lastYear'
}

export const shortcuts = [
    {
        text: 'Ҳама',
        value: Shortcuts.all
    },
    {
        text: 'Ҳафтаи ҳозира',
        value: Shortcuts.currentWeek
    },
    {
        text: 'Ҳафтаи гузашта',
        value: Shortcuts.lastWeek
    },
    {
        text: 'Моҳи ҳозира',
        value: Shortcuts.currentMonth
    },
    {
        text: 'Моҳи гузашта',
        value: Shortcuts.lastMonth
    },
    {
        text: 'Соли ҳозира',
        value: Shortcuts.currentYear
    },
    {
        text: 'Соли гузашта',
        value: Shortcuts.lastYear
    }
];
