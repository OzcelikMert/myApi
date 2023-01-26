import Variable from "../library/variable";
import {InsertLogParamDocument} from "../types/services/log";
import logModel from "../models/log.model";
import MongoDBHelpers from "../library/mongodb/helpers";
import logObjectIdKeys from "../constants/objectIdKeys/log.objectIdKeys";

export default {
    async insert(params: InsertLogParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, logObjectIdKeys);

        return await logModel.create({
            ...params,
            ...(params.body ? {body: JSON.stringify(params.body)} : {}),
            ...(params.query ? {query: JSON.stringify(params.query)} : {}),
            ...(params.params ? {params: JSON.stringify(params.params)} : {}),
            ...(params.userId ? {userId: params.userId} : {})
        })
    }
};