import Mysql, {QueryValueTypes} from "../../library/mysql";
import db from "../../config/db";
import tables from "../../config/db/tables";
import {StatusId} from "../../public/static";
import UserFunctions from "../../utils/functions/user";
import {UpdateSetDocument} from "../../library/mysql/modules/queries/update";
import V, {DateMask} from "../../library/variable";
import UserDocument, {
    InsertUserParamDocument,
    SelectUserParamDocument,
    UpdateUserParamDocument
} from "../../types/services/user";

export default {
    select(params: SelectUserParamDocument): UserDocument[] {
        params = V.clearAllData(params);
        let query = new Mysql(db.conn).select(tables.Users.TableName)
            .columns("*")
            .where.notEquals(
                {columnName: tables.Users.statusId, value: StatusId.Deleted, valueType: QueryValueTypes.Number}
            );
        if (params.email && params.password) {
            query.where.equals(
                {columnName: tables.Users.email, value: params.email},
                {columnName: tables.Users.password, value: UserFunctions.encodePassword(params.password)}
            );
        } else if (params.userId) {
            query.where.equals({columnName: tables.Users.id, value: params.userId, valueType: QueryValueTypes.Number});
        }

        return query.run().map((user: UserDocument) => {
            user.userPermissions = JSON.parse(user.userPermissions);
            delete user.userPassword;
            return user;
        });
    },
    insert(params: InsertUserParamDocument){
        params = V.clearAllData(params);
        if(params.permissionId === [0]) params.permissionId = [];
        let query = new Mysql(db.conn).insert(tables.Users.TableName)
            .columns(
                tables.Users.roleId,
                tables.Users.statusId,
                tables.Users.name,
                tables.Users.email,
                tables.Users.password,
                tables.Users.permissions,
            ).values(
                {value: params.roleId, valueType: QueryValueTypes.Number},
                {value: params.statusId, valueType: QueryValueTypes.Number},
                {value: params.name},
                {value: params.email},
                {value: UserFunctions.encodePassword(params.password)},
                {value: JSON.stringify(params.permissionId)},
            );

        return query.run();
    },
    update(params: UpdateUserParamDocument) {
        params = V.clearAllData(params);
        if (params.permissionId || params.permissionId === [0]) params.permissionId = [];
        const setData: UpdateSetDocument[] = [];

        if (params.image) setData.push({columnName: tables.Users.image, value: params.image});
        if (params.name) setData.push({columnName: tables.Users.name, value: params.name});
        if (params.comment) setData.push({columnName: tables.Users.comment, value: params.comment});
        if (params.phone) setData.push({columnName: tables.Users.phone, value: params.phone});
        if (params.email) setData.push({columnName: tables.Users.email, value: params.email});
        if (params.password) setData.push({columnName: tables.Users.password, value: UserFunctions.encodePassword(params.password)});
        if (params.banDateEnd) setData.push({
            columnName: tables.Users.banDateEnd,
            value: new Date(params.banDateEnd).getStringWithMask(DateMask.DATE)
        });
        if (params.banComment) setData.push({columnName: tables.Users.banComment, value: params.banComment});
        if (params.statusId) setData.push({
            columnName: tables.Users.statusId,
            value: params.statusId,
            valueType: QueryValueTypes.Number
        });
        if (params.roleId) setData.push({
            columnName: tables.Users.roleId,
            value: params.roleId,
            valueType: QueryValueTypes.Number
        });
        if (params.permissionId) setData.push({
            columnName: tables.Users.permissions,
            value: JSON.stringify(params.permissionId)
        });
        if (params.facebook) setData.push({columnName: tables.Users.facebook, value: params.facebook});
        if (params.instagram) setData.push({columnName: tables.Users.instagram, value: params.instagram});
        if (params.twitter) setData.push({columnName: tables.Users.twitter, value: params.twitter});


        let query = new Mysql(db.conn).update(tables.Users.TableName)
            .setWithArray(setData).where.equals(
                {columnName: tables.Users.id, value: params.userId, valueType: QueryValueTypes.Number},
            );

        return query.run();
    }
};