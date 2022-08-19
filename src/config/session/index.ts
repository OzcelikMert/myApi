import FileStore from "session-file-store";
import ExpressSession, {Session} from "express-session";
let store = FileStore(ExpressSession);

let _store: ExpressSession.Store = new store({
    path: "./session",
    ttl: 3600,
    reapInterval: 3600,
    logFn(...args) {},
});

const config: ExpressSession.SessionOptions = {
    store: _store,
    saveUninitialized: false,
    secret: 'ShMf250ld@__45slS',
    resave: false,
    cookie: {
        path: '/',
        sameSite: undefined,
        httpOnly: true,
        secure: false
    },
}

export default {config};