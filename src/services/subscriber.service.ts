import * as mongoose from "mongoose";
import MongoDBHelpers from "../library/mongodb/helpers";
import Variable from "../library/variable";
import {
    SubscriberDeleteManyParamDocument,
    SubscriberDeleteOneWithEmailParamDocument,
    SubscriberAddDocument,
    SubscriberGetManyParamDocument,
    SubscriberGetResultDocument,
    SubscriberGetOneParamDocument,
    SubscriberGetOneWithEmailParamDocument
} from "../types/services/subscriber";
import subscriberModel from "../models/subscriber.model";
import postObjectIdKeys from "../constants/objectIdKeys/post.objectIdKeys";
import {SubscriberDocument} from "../types/models/subscriber";

export default {
    async getOne(params: SubscriberGetOneParamDocument) {
        let filters: mongoose.FilterQuery<SubscriberDocument> = {}
        params = MongoDBHelpers.convertObjectIdInData(params, postObjectIdKeys);

        if (params._id) {
            filters = {
                ...filters,
                _id: params._id
            }
        }

        let query = subscriberModel.findOne(filters, {});

        return (await query.lean().exec()) as SubscriberGetResultDocument | null;
    },
    async getOneWithEmail(params: SubscriberGetOneWithEmailParamDocument) {
        let filters: mongoose.FilterQuery<SubscriberDocument> = {}
        params = MongoDBHelpers.convertObjectIdInData(params, postObjectIdKeys);

        if (params.email) {
            filters = {
                ...filters,
                email: params.email
            }
        }

        let query = subscriberModel.findOne(filters, {});

        return (await query.lean().exec()) as SubscriberGetResultDocument | null;
    },
    async getMany(params: SubscriberGetManyParamDocument) {
        let filters: mongoose.FilterQuery<SubscriberDocument> = {}
        params = MongoDBHelpers.convertObjectIdInData(params, postObjectIdKeys);

        if (params._id) {
            filters = {
                ...filters,
                _id: {$in: params._id}
            }
        }
        if (params.email) {
            filters = {
                ...filters,
                email: {$regex: new RegExp(params.email, "i")}
            }
        }

        let query = subscriberModel.find(filters, {});

        query.sort({createdAt: -1});

        return (await query.lean().exec()) as SubscriberGetResultDocument[];
    },
    async add(params: SubscriberAddDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, postObjectIdKeys);

        return await subscriberModel.create(params)
    },
    async deleteMany(params: SubscriberDeleteManyParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, postObjectIdKeys);

        let filters: mongoose.FilterQuery<SubscriberDocument> = {}

        if(params._id){
            filters = {
                ...filters,
                _id: {$in: params._id}
            }
        }

        return await Promise.all((await subscriberModel.find(filters).exec()).map(async doc => {
            await doc.remove();
            return doc;
        }));
    },
    async deleteOneWithEmail(params: SubscriberDeleteOneWithEmailParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, postObjectIdKeys);

        let filters: mongoose.FilterQuery<SubscriberDocument> = {}

        if (params.email) {
            filters = {
                ...filters,
                email: params.email
            }
        }

        let doc = (await subscriberModel.findOne(filters).exec());

        if(doc){
            await doc.remove();
        }

        return doc;
    }
};