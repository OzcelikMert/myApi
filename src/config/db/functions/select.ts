import tables from "../tables";
import V from "../../../library/variable"
import db from "../";
import Mysql, {MySqlHelpers, QueryValueTypes} from "../../../library/mysql";
import {
    LanguageDocument,
    PostDocument,
    PostTermDocument,
    SeoDocument,
    UserDocument
} from "../../../modules/ajax/result/data";
import {StatusId} from "../../../public/static";
import {SettingsDocument} from "../../../modules/ajax/result/data/settings";

const Select = {
    Users({email = "", password = "", userId = 0}): UserDocument[] {
        let query = new Mysql(db.conn).select(tables.Users.TableName)
            .columns(
                tables.Users.id,
                tables.Users.name,
                tables.Users.email,
                tables.Users.roleId,
                tables.Users.statusId,
                tables.Users.permissions,
                tables.Users.banDateEnd,
                tables.Users.banComment,
                tables.Users.image
            ).where.notEquals(
                {columnName: tables.Users.statusId, value: StatusId.Deleted, valueType: QueryValueTypes.Number}
            );
        if (!V.isEmpty(email, password)) {
            query.where.equals(
                {columnName: tables.Users.email, value: email},
                {columnName: tables.Users.password, value: password}
            );
        } else if (userId > 0) {
            query.where.equals({columnName: tables.Users.id, value: userId, valueType: QueryValueTypes.Number});
        }
        return query.run();
    },
    PostTerms({termId = 0, postTypeId = 0, typeId = 0, langId = 0, statusId = 0, getContents = false}): PostTermDocument[] {
        let columns: string[] = (getContents) ? [
                `${tables.PostTerms.TableName}.*`,
                `${tables.PostTermContents.TableName}.*`
            ]
            : [
                `${tables.PostTerms.TableName}.*`,
                tables.PostTermContents.id,
                tables.PostTermContents.langId,
                tables.PostTermContents.title,
                tables.PostTermContents.url
            ];

        let query = new Mysql(db.conn).select(tables.PostTerms.TableName)
            .columnsWithArray(columns)
            .join.inner({
                tableName: tables.PostTermContents.TableName,
                on: [{columnName: tables.PostTermContents.termId, value: tables.PostTerms.id}]
            });

        if (termId > 0) query.where.equals({
            columnName: tables.PostTerms.id,
            value: termId,
            valueType: QueryValueTypes.Number
        });
        if (postTypeId > 0) query.where.equals({
            columnName: tables.PostTerms.postTypeId,
            value: postTypeId,
            valueType: QueryValueTypes.Number
        });
        if (typeId > 0) query.where.equals({
            columnName: tables.PostTerms.typeId,
            value: typeId,
            valueType: QueryValueTypes.Number
        });
        if (statusId > 0) query.where.equals({
            columnName: tables.PostTerms.statusId,
            value: statusId,
            valueType: QueryValueTypes.Number
        });
        if (langId > 0) query.where.equals({
            columnName: tables.PostTermContents.langId,
            value: langId,
            valueType: QueryValueTypes.Number
        });

        return query.run();
    },
    Posts({postId = 0, typeId = 0, langId = 0, statusId = 0, getContents = false, maxCount = 0}): PostDocument[] {
        let columns: string[] = (getContents) ? [
                `${tables.Posts.TableName}.*`,
                `${tables.PostContents.TableName}.*`
            ]
            : [
                `${tables.Posts.TableName}.*`,
                tables.PostContents.id,
                tables.PostContents.langId,
                tables.PostContents.title,
                tables.PostContents.url
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
            .join.inner(
                {
                    tableName: tables.PostContents.TableName,
                    on: [{columnName: tables.PostContents.postId, value: tables.Posts.id}]
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
                    on: [{columnName: tables.PostTermContents.termId, value: tables.PostTerms.id}]
                }
            ).groupBy(
                tables.Posts.id
            ).orderBy.desc(
                tables.Posts.isFixed,
                tables.Posts.order,
                tables.Posts.id
            );

        if (postId > 0) query.where.equals({
            columnName: tables.Posts.id,
            value: postId,
            valueType: QueryValueTypes.Number
        });
        if (typeId > 0) query.where.equals({
            columnName: tables.Posts.typeId,
            value: typeId,
            valueType: QueryValueTypes.Number
        });
        if (statusId > 0) query.where.equals({
            columnName: tables.Posts.statusId,
            value: statusId,
            valueType: QueryValueTypes.Number
        });
        if (langId > 0) query.where.equals({
            columnName: tables.PostContents.langId,
            value: langId,
            valueType: QueryValueTypes.Number
        });
        if(maxCount > 0) query.limit(maxCount);

        return query.run();
    },
    Seo({langId = 0}): SeoDocument[] {
        let query = new Mysql(db.conn).select(tables.SeoContents.TableName)
            .columns(`*`);

        if (langId > 0) {
            query.where.equals({
                columnName: tables.SeoContents.langId,
                value: langId,
                valueType: QueryValueTypes.Number
            });
        }

        return query.run();
    },
    Settings({id = 0}): SettingsDocument[] {
        let query = new Mysql(db.conn).select(tables.Settings.TableName)
            .columns(`*`);

        if (id > 0) query.where.equals({
            columnName: tables.Settings.id,
            value: id,
            valueType: QueryValueTypes.Number
        });

        return query.run();
    },
    Languages({id = 0}): LanguageDocument[] {
        let query = new Mysql(db.conn).select(tables.Languages.TableName)
            .columns(`*`);

        if (id > 0) query.where.equals({
            columnName: tables.Languages.id,
            value: id,
            valueType: QueryValueTypes.Number
        });

        return query.run();
    },
}

export default Select;