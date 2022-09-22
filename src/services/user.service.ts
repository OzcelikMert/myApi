import * as mongoose from "mongoose";
import V from "../library/variable";
import userModel from "../models/user.model";
import {
    InsertUserParamDocument,
    SelectUserParamDocument, SelectUserResultDocument,
    UpdateUserParamDocument,
    UserDocument
} from "../types/services/user";
import {StatusId} from "../constants/status.const";
import userUtil from "../utils/functions/user.util";
import MongoDBHelpers from "../library/mongodb/helpers";

export default {
    async select(params: SelectUserParamDocument): Promise<SelectUserResultDocument[]> {
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
        if (params.userId) {
            filters = {
                ...filters,
                _id: MongoDBHelpers.createObjectId(params.userId)
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
                _id: { $nin: MongoDBHelpers.createObjectIdArray(params.ignoreUserId) }
            }
        }

        let query = userModel.find(filters, {});
        if(params.maxCount) query.limit(params.maxCount);

        return (await query.exec())?.map(user => {
            delete user.password;
            return user;
        });
    },
    async insert(params: InsertUserParamDocument) {
        return await userModel.create({
            ...params,
            password: userUtil.encodePassword(params.password)
        })
    },
    async update(params: UpdateUserParamDocument) {
        let filters: mongoose.FilterQuery<UserDocument> = {}

        if (Array.isArray(params.userId)) {
            filters = {
                _id: {$in: MongoDBHelpers.createObjectIdArray(params.userId)}
            }
        } else {
            filters = {
                _id: MongoDBHelpers.createObjectId(params.userId)
            };
        }

        delete params.userId;
        return (await userModel.find(filters))?.map( async doc => {
            if(params.password) {
                params.password = userUtil.encodePassword(params.password)
            }

            doc = Object.assign(doc, params);
            return await doc.save();
        })
    }
};