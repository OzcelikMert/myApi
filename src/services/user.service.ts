import * as mongoose from "mongoose";
import userModel from "../models/user.model";
import {
    DeleteUserParamDocument,
    InsertUserParamDocument,
    SelectUserParamDocument, SelectUserResultDocument,
    UpdateUserParamDocument, UpdateUserPasswordParamDocument, UpdateUserProfileParamDocument,
    UserDocument
} from "../types/services/user";
import {StatusId} from "../constants/status";
import userUtil from "../utils/user.util";
import MongoDBHelpers from "../library/mongodb/helpers";
import {Config} from "../config";
import Variable from "../library/variable";
import userObjectIdKeys from "../constants/objectIdKeys/user.objectIdKeys";

export default {
    async select(params: SelectUserParamDocument): Promise<SelectUserResultDocument[]> {
        params = MongoDBHelpers.convertObjectIdInData(params, [...userObjectIdKeys, "ignoreUserId"]);

        let filters: mongoose.FilterQuery<UserDocument> = {
            statusId: { $ne: StatusId.Deleted},
        }

        if (params.email) {
            filters = {
                ...filters,
                email: params.email
            }
        }
        if (params.email && params.password) {
            filters = {
                ...filters,
                password: userUtil.encodePassword(params.password)
            }
        }
        if (params._id) {
            filters = {
                ...filters,
                _id: params._id
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
        if(params.url){
            filters = {
                ...filters,
                url: params.url
            }
        }
        if(params.ignoreUserId){
            filters = {
                ...filters,
                _id: { $nin: params.ignoreUserId }
            }
        }

        let query = userModel.find(filters, {});
        if(params.maxCount) query.limit(params.maxCount);

        return (await query.lean().exec()).map((user: SelectUserResultDocument) => {
            delete user.password;
            user.isOnline = Config.onlineUsers.indexOfKey("_id", user._id?.toString()) > -1;
            return user;
        });
    },
    async insert(params: InsertUserParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, userObjectIdKeys);

        return await userModel.create({
            ...params,
            password: userUtil.encodePassword(params.password)
        })
    },
    async update(params: UpdateUserParamDocument) {
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

        return await Promise.all((await userModel.find(filters).exec()).map( async doc => {
            if(params.password) {
                params.password = userUtil.encodePassword(params.password)
                delete params.password;
            }

            doc = Object.assign(doc, params);
            await doc.save();
            return params;
        }));
    },
    async updateProfile(params: UpdateUserProfileParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, userObjectIdKeys);

        let filters: mongoose.FilterQuery<UserDocument> = {}

        if (params._id) {
            filters = {
                _id: params._id
            }
        }

        return await Promise.all((await userModel.find(filters).exec()).map( async doc => {
            doc = Object.assign(doc, params);
            await doc.save();
            return params;
        }));
    },
    async updatePassword(params: UpdateUserPasswordParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, userObjectIdKeys);

        let filters: mongoose.FilterQuery<UserDocument> = {}

        if (params._id) {
            filters = {
                _id: params._id
            }
        }

        return await Promise.all((await userModel.find(filters).exec()).map( async doc => {
            params.password = userUtil.encodePassword(params.password)
            await doc.save();
            return {
                _id: doc._id
            };
        }));
    },
    async delete(params: DeleteUserParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, userObjectIdKeys);

        let filters: mongoose.FilterQuery<UserDocument> = {}

        if (params._id) {
            filters = {
                _id: params._id
            }
        }

        return await Promise.all((await userModel.find(filters).exec()).map( async doc => {
            doc.statusId = StatusId.Deleted;
            await doc.save();
            return {
                _id: doc._id
            };
        }));
    }
};