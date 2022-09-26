import mongoose from "mongoose";
import config from "config";
import Variable from "../../library/variable";

const name = config.get("dbName") as string;
const host = config.get("dbHost") as string;
const hostParams = config.get("dbHostParams") as string;
const port = config.get("dbPort") as number;
const user = config.get("dbUser") as string;
const password = config.get("dbPassword") as string;
console.log(`mongodb://${host}${!Variable.isEmpty(port) ? `:${port}` : ""}${!Variable.isEmpty(hostParams) ? `${hostParams}` : ""}`);
function dbConnect() {
    return mongoose.connect(`mongodb+srv://${host}${!Variable.isEmpty(port) ? `:${port}` : ""}${!Variable.isEmpty(hostParams) ? `${hostParams}` : ""}`, {
        autoCreate: true,
        autoIndex: true,
        dbName: name,
        user: user,
        pass: password,
    })
}

export default dbConnect;