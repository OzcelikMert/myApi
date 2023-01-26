import * as mongoose from "mongoose";
import MongoDBHelpers from "../library/mongodb/helpers";
import Variable from "../library/variable";
import {
    DeleteSubscriberParamDocument,
    InsertSubscriberDocument,
    SelectSubscriberParamDocument,
    SelectSubscriberResultDocument,
    SubscriberDocument
} from "../types/services/subscriber";
import subscriberModel from "../models/subscriber.model";
import postObjectIdKeys from "../constants/objectIdKeys/post.objectIdKeys";

export default {
    async select(params: SelectSubscriberParamDocument): Promise<SelectSubscriberResultDocument[]> {
        let filters: mongoose.FilterQuery<SubscriberDocument> = {}
        params = MongoDBHelpers.convertObjectIdInData(params, postObjectIdKeys);

        if (params.id) {
            filters = {
                ...filters,
                _id: params.id
            }
        }
        if (params.email) {
            filters = {
                ...filters,
                email: params.email
            }
        }

        let query = subscriberModel.find(filters, {});

        return (await query.lean().exec());
    },
    async insert(params: InsertSubscriberDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, postObjectIdKeys);

        return await subscriberModel.create(params)
    },
    async delete(params: DeleteSubscriberParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, postObjectIdKeys);

        let filters: mongoose.FilterQuery<SubscriberDocument> = {}

        if(params._id){
            if (Array.isArray(params._id)) {
                filters = {
                    _id: {$in: params._id}
                }
            }
        }
        if (params.email) {
            filters = {
                ...filters,
                email: params.email
            }
        }

        return await Promise.all((await subscriberModel.find(filters).exec()).map(async doc => {
            await doc.remove();
            return doc;
        }));
    }
};