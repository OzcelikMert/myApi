import mongoose from "mongoose";
import config from "config";
import Variable from "../../library/variable";

const protocol = config.get("dbProtocol") as string;
const name = config.get("dbName") as string;
const host = config.get("dbHost") as string;
const hostParams = config.get("dbHostParams") as string;
const port = config.get("dbPort") as number;
const user = config.get("dbUser") as string;
const password = config.get("dbPassword") as string;

function dbConnect() {
    mongoose.set("strictQuery", false);
    return mongoose.connect(`${protocol}://${host}${!Variable.isEmpty(port) ? `:${port}` : ""}${!Variable.isEmpty(hostParams) ? `${hostParams}` : ""}`, {
        autoCreate: true,
        autoIndex: true,
        dbName: name,
        user: user,
        pass: password,
    })
}

export default dbConnect;