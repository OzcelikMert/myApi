import Create from "./create";

const authWithoutDBName = {
    host: '192.168.1.109',
    port: '3306',
    user: 'root',
    password: '',
    charset : 'utf8'
}

const auth = Object.assign({
    database: 'myadminpanel',
    typeCast: function (field: any, next: any) {
        console.log(field)
        if (field.type === "JSON") {
            return JSON.parse(field.string());
        } else {
            return next();
        }
    }
}, authWithoutDBName)

let conn: any = null;

export default {auth, authWithoutDBName, conn, Create}