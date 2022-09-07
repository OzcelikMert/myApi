import * as mongoose from "mongoose";
import V from "../library/variable";
import userModel from "../model/user.model";
import {
    InsertUserParamDocument,
    SelectUserParamDocument, SelectUserResultDocument,
    UpdateUserParamDocument,
    UserDocument
} from "../types/services/user";
import {StatusId} from "../constants/status.const";

export default {
    async select(params: SelectUserParamDocument): Promise<SelectUserResultDocument[]> {
        params = V.clearAllData(params);

        let filters: mongoose.FilterQuery<UserDocument> = {
            statusId: { $ne: StatusId.Deleted},
        }

        if (params.email && params.password) {
            filters = {
                ...filters,
                email: params.email,
                password: params.password
            }
        }
        if (params.userId) {
            filters = {
                ...filters,
                _id: params.userId
            }
        }
        if(params.statusId){
            filters = {
                ...filters,
                statusId: params.statusId
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
                _id: { $ne: { $in: params.ignoreUserId } }
            }
        }

        let query = userModel.find(filters, {});
        if(params.maxCount) query.limit(params.maxCount);

        return (await query.exec()).map(user => {
            delete user.password;
            return user;
        });
    },
    async insert(params: InsertUserParamDocument) {
        params = V.clearAllData(params);
        if(params.permissionId === [0]) params.permissionId = [];

        return await userModel.create({
            ...params
        })
    },
    async update(params: UpdateUserParamDocument) {
        params = V.clearAllData(params);
        if (params.permissionId || params.permissionId === [0]) params.permissionId = [];

        let filters: mongoose.FilterQuery<UserDocument> = {}

        if (Array.isArray(params.userId)) {
            filters = {
                _id: {$in: params.userId}
            }
        } else {
            filters = {
                _id: params.userId
            };
        }

        delete params.userId;
        return (await userModel.find(filters)).map( async doc => {
            doc = Object.assign(doc, params);
            return await doc.save();
        })
    }
};