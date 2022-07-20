import Create from "./create";
import config from "config";

const host = config.get("dbHost") as string;
const port = config.get("dbPort") as number;
const user = config.get("dbUser") as string;
const password = config.get("dbPassword") as string;


const authWithoutDBName = {
    host: host,
    port: port,
    user: user,
    password: password,
    charset : 'utf8',
    connectTimeout: 25000,
    acquireTimeout: 25000,
    waitForConnections: true,
}

const auth = Object.assign({
    database: 'myadminpanel',
}, authWithoutDBName)

let conn: any = null;

export default {auth, authWithoutDBName, conn, Create}