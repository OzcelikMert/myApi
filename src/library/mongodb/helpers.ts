import mongoose from "mongoose";

class MongoDBHelpers {
    static createObjectId(string?: string) {
        // @ts-ignore
        let returnData = new mongoose.Types.ObjectId()._id;
        if(string){
            try {
                returnData = new mongoose.Types.ObjectId(string)._id;
            }catch (e: any) {}
        }
        return returnData
    }
    static createObjectIdArray(strings: string[]) {
        // @ts-ignore
        return strings.map(string => {
            // @ts-ignore
            let returnData = new mongoose.Types.ObjectId()._id;
            if(string){
                try {
                    returnData = new mongoose.Types.ObjectId(string)._id;
                }catch (e: any) {}
            }
            return returnData
        });
    }
}

export default MongoDBHelpers;