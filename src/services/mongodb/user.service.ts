import * as mongoose from "mongoose";
import {StatusId} from "../../public/static";
import UserFunctions from "../../utils/functions/user";
import V, {DateMask} from "../../library/variable";
import {
    InsertUserParamDocument,
    SelectUserParamDocument, UpdateUserParamDocument,
} from "../../types/services/user";
import userModel, {UserDocument} from "../../model/user.model";

export default {
    async select(params: SelectUserParamDocument): Promise<UserDocument[]> {
        params = V.clearAllData(params);

        let filters: mongoose.FilterQuery<UserDocument> = {
            statusId: { $ne: StatusId.Deleted},
        }

        if (params.email && params.password) {
            filters = {
                ...filters,
                email: params.email,
                password: UserFunctions.encodePassword(params.password)
            }
        } else if (params.userId) {
            filters = {
                ...filters,
                _id: params.userId
            }
        }

        let query = await userModel.find(filters, {}, {lean: true});

        return query.map(user => {
            delete user.password;
            return user;
        });
    },
    async insert(params: InsertUserParamDocument) {
        params = V.clearAllData(params);
        if(params.permissionId === [0]) params.permissionId = [];

        return await userModel.create({
            roleId: params.roleId,
            statusId: params.statusId,
            name: params.name,
            email: params.email,
            password: UserFunctions.encodePassword(params.password),
            permissions: params.permissionId
        })
    },
    async update(params: UpdateUserParamDocument) {
        params = V.clearAllData(params);
        if (params.permissionId || params.permissionId === [0]) params.permissionId = [];

        await userModel.findOne({_id: params.userId}).then(async doc => {
            if(doc){
                if (params.image) doc.image = params.image;
                if (params.name) doc.name = params.name;
                if (params.comment) doc.comment = params.comment;
                if (params.phone) doc.phone = params.phone;
                if (params.email) doc.email = params.email;
                if (params.password)  doc.password = UserFunctions.encodePassword(params.password);
                if (params.banDateEnd) doc.banDateEnd = new Date(params.banDateEnd).getStringWithMask(DateMask.DATE);
                if (params.banComment) doc.banComment = params.banComment;
                if (params.statusId) doc.statusId = params.statusId;
                if (params.roleId) doc.roleId = params.roleId;
                if (params.permissionId) doc.permissions = params.permissionId;
                if (params.facebook) doc.facebook = params.facebook;
                if (params.instagram) doc.instagram = params.instagram;
                if (params.twitter) doc.twitter = params.twitter;
                await doc.save();
            }
        })
    }
};