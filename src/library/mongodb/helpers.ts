import mongoose from "mongoose";

class MongoDBHelpers {
    static createObjectId(string?: string) {
        // @ts-ignore
        return new mongoose.Types.ObjectId(string)._id;
    }
    static createObjectIdArray(strings: string[]) {
        // @ts-ignore
        return strings.map(string => new mongoose.Types.ObjectId(string)._id);
    }
}

export default MongoDBHelpers;