import config from "config";
import FileStore from "session-file-store";
import ExpressSession from "express-session";

const store = FileStore(ExpressSession);

const serverProtocol = config.get("serverProtocol") as string;

export const sessionTTL = 60 * 60;

let _store: ExpressSession.Store = new store({
    path: "./session",
    ttl: sessionTTL,
    reapInterval: sessionTTL,
    logFn(...args) {}
});

const sessionConfig: ExpressSession.SessionOptions = {
    store: _store,
    name: "auth",
    saveUninitialized: false,
    secret: 'ShMf250ld@__45slS',
    resave: false,
    proxy: serverProtocol !== "http",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        path: '/',
        sameSite: undefined,
        httpOnly: true,
        secure: serverProtocol !== "http"
    },
}

export default {sessionConfig};