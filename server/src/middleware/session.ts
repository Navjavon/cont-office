import uuid from 'uuid/v4';
import session from 'express-session';
// import SessionFileStore from 'session-file-store';
import {NextFunction} from 'express';
import {UNAUTHORIZED} from '@constants/http-statuses';
import {MAX_AGE} from '@constants/index';

// const FileStore = SessionFileStore(session);

export default session({
    genid: (_) => uuid(), // use UUIDs for session IDs
    name: 'user_sid',
    // store: new FileStore(),
    secret: 'cont-office-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: MAX_AGE
    }
});

// middleware function to check for logged-in users
export const sessionChecker = (req: eRequest, res: eResponse, next: NextFunction) => {
    if (req.path.includes('login') ||
        (req.session.username && req?.cookies?.user_sid) ||
        req.method === 'OPTIONS'
    ) {
        next();
        return;
    }

    res.status(UNAUTHORIZED).json({message: 'Not authorised'});
};
