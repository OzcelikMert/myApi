import mongoose from "mongoose";
import config from "config";

const name = config.get("dbName") as string;
const host = config.get("dbHost") as string;
const port = config.get("dbPort") as number;
const user = config.get("dbUser") as string;
const password = config.get("dbPassword") as string;

function dbConnect() {
    return mongoose.connect(`mongodb://${host}:${port}`, {
        autoCreate: true,
        autoIndex: true,
        dbName: name,
        user: user,
        pass: password,
    })
}

export default dbConnect;