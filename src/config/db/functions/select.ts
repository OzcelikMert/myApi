import tables from "../tables";
import V from "../../../library/variable"
import db from "../";
import Mysql, {MySqlHelpers, QueryValueTypes} from "../../../library/mysql";
import {
    LanguageDocument,
    NavigateDocument,
    PostDocument,
    PostTermDocument,
    SeoDocument,
    UserDocument
} from "../../../modules/ajax/result/data";
import {StatusId} from "../../../public/static";
import {SettingsDocument} from "../../../modules/ajax/result/data/settings";
import SelectPostParamDocument from "../../../modules/config/db/functions/select/post";
import SelectUserParamDocument from "../../../modules/config/db/functions/select/user";
import SelectPostTermParamDocument from "../../../modules/config/db/functions/select/postTerm";
import SelectSeoParamDocument from "../../../modules/config/db/functions/select/seo";
import SelectSettingParamDocument from "../../../modules/config/db/functions/select/setting";
import SelectLanguageParamDocument from "../../../modules/config/db/functions/select/language";
import SelectNavigateParamDocument from "../../../modules/config/db/functions/select/navigate";

const Select = {
    Users(params: SelectUserParamDocument): UserDocument[] {
        let query = new Mysql(db.conn).select(tables.Users.TableName)
            .columns("*")
            .where.notEquals(
                {columnName: tables.Users.statusId, value: StatusId.Deleted, valueType: QueryValueTypes.Number}
            );
        if (!V.isEmpty(params.email, params.password)) {
            query.where.equals(
                {columnName: tables.Users.email, value: params.email},
                {columnName: tables.Users.password, value: params.password}
            );
        } else if (params.userId) {
            query.where.equals({columnName: tables.Users.id, value: params.userId, valueType: QueryValueTypes.Number});
        }
        return query.run();
    },
    PostTerms(params: SelectPostTermParamDocument): PostTermDocument[] {
        let columns: string[] = (params.getContents) ? [
                `${tables.PostTerms.TableName}.*`,
                `${tables.PostTermContents.TableName}.*`
            ]
            : [
                `${tables.PostTerms.TableName}.*`,
                tables.PostTermContents.id,
                tables.PostTermContents.langId,
                tables.PostTermContents.title,
                tables.PostTermContents.url,
                tables.PostTermContents.image
            ];

        let query = new Mysql(db.conn).select(tables.PostTerms.TableName)
            .columnsWithArray(columns)
            .join.left({
                tableName: tables.PostTermContents.TableName,
                on: [
                    {columnName: tables.PostTermContents.termId, value: tables.PostTerms.id},
                    {columnName: tables.PostTermContents.langId, value: params.langId}
                ]
            });

        if (params.termId) query.where.equals({
            columnName: tables.PostTerms.id,
            value: params.termId,
            valueType: QueryValueTypes.Number
        });
        if (params.postTypeId) query.where.equals({
            columnName: tables.PostTerms.postTypeId,
            value: params.postTypeId,
            valueType: QueryValueTypes.Number
        });
        if (params.typeId ) query.where.equals({
            columnName: tables.PostTerms.typeId,
            value: params.typeId,
            valueType: QueryValueTypes.Number
        });
        if (params.statusId) query.where.equals({
            columnName: tables.PostTerms.statusId,
            value: params.statusId,
            valueType: QueryValueTypes.Number
        });

        return query.run();
    },
    Posts(params: SelectPostParamDocument): PostDocument[] {
        let columns: string[] = (params.getContents) ? [
                `${tables.Posts.TableName}.*`,
                `${tables.PostContents.TableName}.*`
            ]
            : [
                `${tables.Posts.TableName}.*`,
                tables.PostContents.id,
                tables.PostContents.langId,
                tables.PostContents.title,
                tables.PostContents.url,
                tables.PostContents.image
            ];

        let query = new Mysql(db.conn).select(tables.Posts.TableName)
            .columnsWithArray(columns.concat([
                MySqlHelpers.asName(
                    MySqlHelpers.jsonArrayAGG(
                        MySqlHelpers.jsonObject(
                            {key: tables.PostTerms.id, value: tables.PostTerms.id},
                            {key: tables.PostTerms.typeId, value: tables.PostTerms.typeId},
                            {key: tables.PostTermContents.title, value: tables.PostTermContents.title},
                            {key: tables.PostTermContents.url, value: tables.PostTermContents.url},
                        )
                    ), "postTermContents")
            ]))
            .join.left(
                {
                    tableName: tables.PostContents.TableName,
                    on: [
                        {columnName: tables.PostContents.postId, value: tables.Posts.id},
                        {columnName: tables.PostContents.langId, value: params.langId}
                    ]
                },
                {
                    tableName: tables.PostTermLinks.TableName,
                    on: [{columnName: tables.PostTermLinks.postId, value: tables.Posts.id}]
                },
                {
                    tableName: tables.PostTerms.TableName,
                    on: [{columnName: tables.PostTerms.id, value: tables.PostTermLinks.termId}]
                },
                {
                    tableName: tables.PostTermContents.TableName,
                    on: [
                        {columnName: tables.PostTermContents.termId, value: tables.PostTerms.id},
                        {columnName: tables.PostTermContents.langId, value: params.langId}
                    ]
                }
            ).groupBy(
                tables.Posts.id
            ).orderBy.desc(
                tables.Posts.isFixed,
                tables.Posts.order,
                tables.Posts.id
            );

        if (params.postId) query.where.equals({
            columnName: tables.Posts.id,
            value: params.postId,
            valueType: QueryValueTypes.Number
        });
        if (params.typeId) query.where.equals({
            columnName: tables.Posts.typeId,
            value: params.typeId,
            valueType: QueryValueTypes.Number
        });
        if (params.statusId) query.where.equals({
            columnName: tables.Posts.statusId,
            value: params.statusId,
            valueType: QueryValueTypes.Number
        });
        if(params.maxCount) query.limit(params.maxCount);

        return query.run();
    },
    Seo(params: SelectSeoParamDocument): SeoDocument[] {
        let query = new Mysql(db.conn).select(tables.SeoContents.TableName)
            .columns(`*`)
            .where.equals({
                columnName: tables.SeoContents.langId,
                value: params.langId,
                valueType: QueryValueTypes.Number
            });

        return query.run();
    },
    Settings(params: SelectSettingParamDocument): SettingsDocument[] {
        let query = new Mysql(db.conn).select(tables.Settings.TableName)
            .columns(`*`);

        if (params.id) query.where.equals({
            columnName: tables.Settings.id,
            value: params.id,
            valueType: QueryValueTypes.Number
        });

        return query.run();
    },
    Languages(params: SelectLanguageParamDocument): LanguageDocument[] {
        let query = new Mysql(db.conn).select(tables.Languages.TableName)
            .columns(`*`);

        if (params.id) query.where.equals({
            columnName: tables.Languages.id,
            value: params.id,
            valueType: QueryValueTypes.Number
        });

        return query.run();
    },
    Navigates(params: SelectNavigateParamDocument): NavigateDocument[] {
        let columns: string[] = (params.getContents) ? [
                `${tables.Navigates.TableName}.*`,
                `${tables.NavigateContents.TableName}.*`
            ]
            : [
                `${tables.Navigates.TableName}.*`,
                tables.NavigateContents.id,
                tables.NavigateContents.navigateId,
                tables.NavigateContents.langId,
                tables.NavigateContents.title,
                tables.NavigateContents.url
            ];

        let query = new Mysql(db.conn).select(tables.Navigates.TableName)
            .columnsWithArray(columns)
            .join.left({
                tableName: tables.NavigateContents.TableName,
                on: [
                    {columnName: tables.NavigateContents.navigateId, value: tables.Navigates.id},
                    {columnName: tables.NavigateContents.langId, value: params.langId}
                ]
            });

        if (params.navigateId) query.where.equals({
            columnName: tables.Navigates.id,
            value: params.navigateId,
            valueType: QueryValueTypes.Number
        });

        if (params.statusId) query.where.equals({
            columnName: tables.Navigates.statusId,
            value: params.statusId,
            valueType: QueryValueTypes.Number
        });

        return query.run();
    },
}

export default Select;