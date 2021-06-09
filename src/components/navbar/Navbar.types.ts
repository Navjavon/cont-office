interface INavbarBaseItem {
    text: string;
    route: string;
    count?: number;
}

interface INavbarComplexItem extends INavbarBaseItem {
    icon: string;
    items?: INavbarBaseItem[];
}
