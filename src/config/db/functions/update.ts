import tables from "../tables";
import db from "../";
import Mysql, {QueryValueTypes} from "../../../library/mysql";
import {UpdateSetDocument} from "../../../library/mysql/modules/queries/update";
import {StatusId} from "../../../public/static";
import V, {DateMask} from "../../../library/variable";
import {
    UpdatePostTermContentParamDocument,
    UpdatePostTermParamDocument
} from "../../../modules/config/db/functions/update/postTerm";
import {
    UpdatePostContentParamDocument,
    UpdatePostParamDocument
} from "../../../modules/config/db/functions/update/post";
import UpdateUserParamDocument from "../../../modules/config/db/functions/update/user";
import UpdateSeoParamDocument from "../../../modules/config/db/functions/update/seo";
import UpdateSettingParamDocument from "../../../modules/config/db/functions/update/setting";
import {
    UpdateNavigateContentParamDocument,
    UpdateNavigateParamDocument
} from "../../../modules/config/db/functions/update/navigate";

const Update = {
    PostTerm(params: UpdatePostTermParamDocument) {
        const setData: UpdateSetDocument[] = [];

        if (params.statusId) setData.push({
            columnName: tables.PostTerms.statusId,
            value: params.statusId,
            valueType: QueryValueTypes.Number
        });
        if (params.mainId) setData.push({
            columnName: tables.PostTerms.mainId,
            value: params.mainId,
            valueType: QueryValueTypes.Number
        });
        if (params.order) setData.push({
            columnName: tables.PostTerms.order,
            value: params.order,
            valueType: QueryValueTypes.Number
        });
        if (params.isFixed) setData.push({
            columnName: tables.PostTerms.isFixed,
            value: params.isFixed,
            valueType: QueryValueTypes.Number
        });

        let query = new Mysql(db.conn).update(tables.PostTerms.TableName)
            .setWithArray(setData)
            .where.equals(
                {columnName: tables.PostTerms.id, value: params.termId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    PostTermContent(params: UpdatePostTermContentParamDocument) {
        const setData: UpdateSetDocument[] = [];

        if (params.image) setData.push({columnName: tables.PostTermContents.image, value: params.image});
        if (params.title) setData.push({columnName: tables.PostTermContents.title, value: params.title});
        if (params.url) setData.push({columnName: tables.PostTermContents.url, value: params.url});
        if (params.seoTitle) setData.push({columnName: tables.PostTermContents.seoTitle, value: params.seoTitle});
        if (params.seoContent) setData.push({columnName: tables.PostTermContents.seoContent, value: params.seoContent});

        let query = new Mysql(db.conn).update(tables.PostTermContents.TableName)
            .setWithArray(setData).where.equals(
                {columnName: tables.PostTermContents.termId, value: params.termId, valueType: QueryValueTypes.Number},
                {columnName: tables.PostTermContents.langId, value: params.langId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    Post(params: UpdatePostParamDocument) {
        const setData: UpdateSetDocument[] = [];

        if (params.statusId) setData.push({
            columnName: tables.Posts.statusId,
            value: params.statusId,
            valueType: QueryValueTypes.Number
        });
        if (params.dateStart) setData.push({
            columnName: tables.Posts.dateStart,
            value: new Date(params.dateStart).getStringWithMask(DateMask.DATE)
        });
        if (params.order) setData.push({
            columnName: tables.Posts.order,
            value: params.order,
            valueType: QueryValueTypes.Number
        });
        if (params.isFixed) setData.push({
            columnName: tables.Posts.isFixed,
            value: params.isFixed,
            valueType: QueryValueTypes.Number
        });

        let query = new Mysql(db.conn).update(tables.Posts.TableName)
            .setWithArray(setData)
            .where.equals(
                {columnName: tables.Posts.id, value: params.postId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    PostContent(params: UpdatePostContentParamDocument) {
        const setData: UpdateSetDocument[] = [];

        if (params.image) setData.push({columnName: tables.PostContents.image, value: params.image});
        if (params.title) setData.push({columnName: tables.PostContents.title, value: params.title});
        if (params.shortContent) setData.push({
            columnName: tables.PostContents.shortContent,
            value: params.shortContent
        });
        if (params.content) setData.push({columnName: tables.PostContents.content, value: params.content});
        if (params.url) setData.push({columnName: tables.PostContents.url, value: params.url});
        if (params.seoTitle) setData.push({columnName: tables.PostContents.seoTitle, value: params.seoTitle});
        if (params.seoContent) setData.push({columnName: tables.PostContents.seoContent, value: params.seoContent});

        let query = new Mysql(db.conn).update(tables.PostContents.TableName)
            .setWithArray(setData).where.equals(
                {columnName: tables.PostContents.postId, value: params.postId, valueType: QueryValueTypes.Number},
                {columnName: tables.PostContents.langId, value: params.langId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    User(params: UpdateUserParamDocument) {
        if (params.permissionId || params.permissionId === [0]) params.permissionId = [];
        const setData: UpdateSetDocument[] = [];

        if (params.image) setData.push({columnName: tables.Users.image, value: params.image});
        if (params.name) setData.push({columnName: tables.Users.name, value: params.name});
        if (params.comment) setData.push({columnName: tables.Users.comment, value: params.comment});
        if (params.phone) setData.push({columnName: tables.Users.phone, value: params.phone});
        if (params.email) setData.push({columnName: tables.Users.email, value: params.email});
        if (params.password) setData.push({columnName: tables.Users.password, value: params.password});
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
    },
    Seo(params: UpdateSeoParamDocument) {
        if (params.tags && params.tags === [""]) params.tags = [];

        const setData: UpdateSetDocument[] = [];

        if (params.title) setData.push({columnName: tables.SeoContents.title, value: params.title});
        if (params.content) setData.push({columnName: tables.SeoContents.content, value: params.content});
        if (params.tags) setData.push({columnName: tables.SeoContents.tags, value: JSON.stringify(params.tags)});

        let query = new Mysql(db.conn).update(tables.SeoContents.TableName)
            .setWithArray(setData).where.equals(
                {columnName: tables.SeoContents.langId, value: params.langId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    Setting(params: UpdateSettingParamDocument) {
        let query = new Mysql(db.conn).update(tables.Settings.TableName)
            .set(
                {columnName: tables.Settings.value, value: params.value}
            ).where.equals(
                {columnName: tables.Settings.id, value: params.id, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    Navigate(params: UpdateNavigateParamDocument) {
        const setData: UpdateSetDocument[] = [];

        if (params.statusId) setData.push({
            columnName: tables.Navigates.statusId,
            value: params.statusId,
            valueType: QueryValueTypes.Number
        });
        if (params.mainId) setData.push({
            columnName: tables.Navigates.mainId,
            value: params.mainId,
            valueType: QueryValueTypes.Number
        });
        if (params.order) setData.push({
            columnName: tables.Navigates.order,
            value: params.order,
            valueType: QueryValueTypes.Number
        });

        let query = new Mysql(db.conn).update(tables.Navigates.TableName)
            .setWithArray(setData)
            .where.equals(
                {columnName: tables.Navigates.id, value: params.navigateId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    NavigateContent(params: UpdateNavigateContentParamDocument) {
        const setData: UpdateSetDocument[] = [];

        if (params.title) setData.push({columnName: tables.NavigateContents.title, value: params.title});
        if (params.url) setData.push({columnName: tables.NavigateContents.url, value: params.url});

        let query = new Mysql(db.conn).update(tables.NavigateContents.TableName)
            .setWithArray(setData).where.equals(
                {
                    columnName: tables.NavigateContents.navigateId,
                    value: params.navigateId,
                    valueType: QueryValueTypes.Number
                },
                {columnName: tables.NavigateContents.langId, value: params.langId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
}

export default Update;