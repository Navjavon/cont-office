// import 'module-alias/register';
import bodyParser from 'body-parser';
import express from 'express';
import morgan  from 'morgan';
import cookieParser from 'cookie-parser';

import session, {sessionChecker} from '@middleware/session';
import cors from '@middleware/cors';
import router from '@/routes';
import '@database';

const app: express.Application = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded( { extended: true }));

app.use(cors);
app.use(session);

// This middleware will check if user's cookie is still saved in browser and user is not set,
// then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
app.use((req: eRequest, res: eResponse, next) => {
    if (req?.cookies?.user_sid && !req.session.userId) {
        res.clearCookie('user_sid');
        res.clearCookie('is_authorised');
    }
    // console.log(req.session.userId);
    next();
});

app.use(express.static(__dirname + '/public'));
app.get('/', (req: eRequest, res: eResponse) => {
    res.sendfile(__dirname + '/public/index.html');
});

app.use(sessionChecker);
app.use('/api', router);

const port = process.env.PORT || 4000; // tslint:disable-line

app.listen(port,  () => (
    console.log(`Server listening on port ${port}!`) // tslint:disable-line
));
