import mongoose from "mongoose";

class MongoDBHelpers {
    static createObjectId(string?: string) {
        // @ts-ignore
        return new mongoose.Types.ObjectId(string)._id;
    }
}

export default MongoDBHelpers;