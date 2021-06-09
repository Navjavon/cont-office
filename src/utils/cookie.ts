export const readCookie = (cname: string) => {
    const name = cname + '=';
    const ca = document.cookie.split(';');
    let res = null;

    ca.forEach((c) => {
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }

        if (c.includes(name)) {
            res = c.substring(name.length, c.length);
        }
    });

    return res;
};
