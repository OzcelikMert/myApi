import Create from "./create";

const authWithoutDBName = {
    host: '192.168.1.20',
    port: '3306',
    user: 'root',
    password: '',
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