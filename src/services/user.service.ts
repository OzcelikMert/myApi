import * as mongoose from "mongoose";
import userModel from "../models/user.model";
import {
    UserDeleteOneParamDocument,
    UserAddParamDocument,
    UserGetOneParamDocument, UserGetResultDocument,
    UserUpdateOneParamDocument, UserUpdatePasswordParamDocument,
    UserGetOneLoginParamDocument,
    UserGetOneWithUrlParamDocument,
    UserGetManyParamDocument, UserUpdateProfileParamDocument
} from "../types/services/user";
import {StatusId} from "../constants/status";
import userUtil from "../utils/user.util";
import MongoDBHelpers from "../library/mongodb/helpers";
import {Config} from "../config";
import Variable from "../library/variable";
import userObjectIdKeys from "../constants/objectIdKeys/user.objectIdKeys";
import {UserDocument} from "../types/models/user";

export default {
    async getOne(params: UserGetOneParamDocument) {
        params = MongoDBHelpers.convertObjectIdInData(params, [...userObjectIdKeys, "ignoreUserId"]);

        let filters: mongoose.FilterQuery<UserDocument> = {
            statusId: { $ne: StatusId.Deleted},
        }

        if (params._id) {
            filters = {
                ...filters,
                _id: params._id
            }
        }
        if (params.url) {
            filters = {
                ...filters,
                url: params.url
            }
        }
        if (params.email) {
            filters = {
                ...filters,
                email: params.email
            }
        }
        if(params.statusId){
            filters = {
                ...filters,
                statusId: params.statusId
            }
        }
        if(params.ignoreUserId){
            filters = {
                ...filters,
                _id: { $nin: params.ignoreUserId }
            }
        }

        let query = userModel.findOne(filters, {});

        let doc = (await query.lean().exec()) as UserGetResultDocument | null;

        if(doc){
            delete doc.password;
            doc.isOnline = Config.onlineUsers.indexOfKey("_id", doc._id.toString()) > -1;
        }

        return doc;
    },
    async getOneLogin(params: UserGetOneLoginParamDocument) {
        params = MongoDBHelpers.convertObjectIdInData(params, userObjectIdKeys);

        let filters: mongoose.FilterQuery<UserDocument> = {
            statusId: { $ne: StatusId.Deleted},
            email: params.email,
            password: userUtil.encodePassword(params.password)
        }

        let query = userModel.findOne(filters, {});

        let doc = (await query.lean().exec()) as UserGetResultDocument | null;

        if(doc){
            delete doc.password;
        }

        return doc;
    },
    async getOneWithUrl(params: UserGetOneWithUrlParamDocument) {
        params = MongoDBHelpers.convertObjectIdInData(params, userObjectIdKeys);

        let filters: mongoose.FilterQuery<UserDocument> = {
            statusId: { $ne: StatusId.Deleted},
        }

        if(params.url){
            filters = {
                ...filters,
                url: params.url
            }
        }

        let query = userModel.findOne(filters, {});

        let doc = (await query.lean().exec()) as UserGetResultDocument | null;

        if(doc){
            delete doc.password;
            doc.isOnline = Config.onlineUsers.indexOfKey("_id", doc._id.toString()) > -1;
        }

        return doc;
    },
    async getMany(params: UserGetManyParamDocument) {
        params = MongoDBHelpers.convertObjectIdInData(params, [...userObjectIdKeys, "ignoreUserId"]);

        let filters: mongoose.FilterQuery<UserDocument> = {
            statusId: { $ne: StatusId.Deleted},
        }

        if (params.email) {
            filters = {
                ...filters,
                email: {$regex: new RegExp(params.email, "i")}
            }
        }
        if (params._id) {
            filters = {
                ...filters,
                _id: {$in: params._id}
            }
        }
        if(params.statusId){
            filters = {
                ...filters,
                statusId: params.statusId
            }
        }
        if(params.roleId){
            filters = {
                ...filters,
                roleId: params.roleId
            }
        }
        if(params.ignoreUserId){
            filters = {
                ...filters,
                _id: { $nin: params.ignoreUserId }
            }
        }

        let query = userModel.find(filters, {});

        if (params.page) query.skip((params.count ?? 10) * (params.page > 0 ? params.page - 1 : 0));
        if (params.count) query.limit(params.count);

        query.sort({createdAt: -1});

        return (await query.lean().exec()).map((user: UserGetResultDocument) => {
            delete user.password;
            user.isOnline = Config.onlineUsers.indexOfKey("_id", user._id?.toString()) > -1;
            return user;
        });
    },
    async add(params: UserAddParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, userObjectIdKeys);

        return await userModel.create({
            ...params,
            password: userUtil.encodePassword(params.password)
        })
    },
    async updateOne(params: UserUpdateOneParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, userObjectIdKeys);

        let filters: mongoose.FilterQuery<UserDocument> = {}

        if (Variable.isEmpty(params.password)) {
            delete params.password;
        }

        if (params._id) {
            filters = {
                _id: params._id
            }
        }

        let doc = (await userModel.findOne(filters).exec());

        if(doc){
            if(params.password) {
                doc.password = userUtil.encodePassword(params.password)
                delete params.password;
            }
            doc = Object.assign(doc, params);
            await doc.save();
        }

        return params;
    },
    async updatePassword(params: UserUpdatePasswordParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, userObjectIdKeys);

        let filters: mongoose.FilterQuery<UserDocument> = {}

        if (params._id) {
            filters = {
                _id: params._id
            }
        }

        let doc = (await userModel.findOne(filters).exec());

        if(doc){
            params.password = userUtil.encodePassword(params.password)
            await doc.save();
        }

        return {
            _id: doc?._id
        };
    },
    async updateProfile(params: UserUpdateProfileParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, userObjectIdKeys);

        let filters: mongoose.FilterQuery<UserDocument> = {}

        if (params._id) {
            filters = {
                _id: params._id
            }
        }

        let doc = (await userModel.findOne(filters).exec());

        if(doc){
            doc = Object.assign(doc, params);
            await doc.save();
        }

        return params;
    },
    async deleteOne(params: UserDeleteOneParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, userObjectIdKeys);

        let filters: mongoose.FilterQuery<UserDocument> = {}

        if (params._id) {
            filters = {
                _id: params._id
            }
        }

        let doc = (await userModel.findOne(filters).exec());

        if(doc){
            doc.statusId = StatusId.Deleted;
            await doc.save();
        }

        return {
            _id: doc?._id
        };
    }
};