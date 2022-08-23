import Mysql, {MySqlHelpers, QueryValueTypes} from "../../library/mysql";
import db from "../../config/db";
import tables from "../../config/db/tables";
import {UpdateSetDocument} from "../../library/mysql/modules/queries/update";
import V, {DateMask} from "../../library/variable";
import PostDocument, {
    DeletePostParamDocument,
    InsertPostParamDocument,
    SelectPostParamDocument,
    UpdatePostParamDocument
} from "../../modules/services/post";

export default {
    select(params: SelectPostParamDocument): PostDocument[] {
        params = V.clearAllData(params);
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
        if (params.url) query.where.equals({
            columnName: tables.PostContents.url,
            value: params.url
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
        if (params.maxCount) query.limit(params.maxCount);

        return query.run().map((item: PostDocument) => {
            item.postTermContents = JSON.parse(item.postTermContents);
            return item;
        });
    },
    insert(params: InsertPostParamDocument) {
        params = V.clearAllData(params);
        let query = new Mysql(db.conn).insert(tables.Posts.TableName)
            .columns(
                tables.Posts.typeId,
                tables.Posts.statusId,
                tables.Posts.order,
                tables.Posts.isFixed,
                tables.Posts.authorId,
                tables.Posts.dateStart,
                tables.Posts.dateCreate
            ).values(
                {value: params.typeId, valueType: QueryValueTypes.Number},
                {value: params.statusId, valueType: QueryValueTypes.Number},
                {value: params.order, valueType: QueryValueTypes.Number},
                {value: params.isFixed, valueType: QueryValueTypes.Number},
                {value: params.authorId, valueType: QueryValueTypes.Number},
                {value: new Date(params.dateStart).getStringWithMask(DateMask.DATE)},
                {value: new Date().getStringWithMask(DateMask.DATE)},
            );

        return query.run();
    },
    update(params: UpdatePostParamDocument) {
        params = V.clearAllData(params);
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
            .where.in(
                {columnName: tables.Posts.id, value: params.postId, valueType: QueryValueTypes.Number}
            );

        if (params.typeId) query.where.equals({
            columnName: tables.Posts.typeId,
            value: params.typeId,
            valueType: QueryValueTypes.Number
        })

        return query.run();
    },
    delete(params: DeletePostParamDocument) {
        params = V.clearAllData(params);
        let query = new Mysql(db.conn).delete(tables.Posts.TableName)
            .where.in(
                {columnName: tables.Posts.id, value: params.postId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    }
};