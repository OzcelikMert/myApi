import config from "config";
import mongoose from 'mongoose';

const serverProtocol = config.get("serverProtocol") as string;

export const sessionTTL = 60 * 60;

const sessionConfig = {
    secret: 'ShMf250ld@__45slS',
    sessionName: "auth",
    cookieName: "auth",
    cookie: {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 365,
        sameSite: 'Lax',
        httpOnly: true,
        secure: serverProtocol !== "http",
    },
    storage: {
        db: mongoose.connection.db,
        collection: 'sessionAuths',
    },
}

export default {sessionConfig};