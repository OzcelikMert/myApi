import Mysql, {MySqlHelpers, QueryValueTypes} from "../library/mysql";
import db from "../config/db";
import tables from "../config/db/tables";
import {UpdateSetDocument} from "../library/mysql/modules/queries/update";
import V, {DateMask} from "../library/variable";
import PostTermDocument, {
    DeletePostTermParamDocument,
    InsertPostTermParamDocument,
    SelectPostTermParamDocument,
    UpdatePostTermParamDocument
} from "../modules/services/postTerm";

export default {
    select(params: SelectPostTermParamDocument): PostTermDocument[] {
        params = V.clearAllData(params);
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
        if (params.url) query.where.equals({
            columnName: tables.PostTermContents.url,
            value: params.url
        });

        return query.run();
    },
    insert(params: InsertPostTermParamDocument) {
        params = V.clearAllData(params);
        let query = new Mysql(db.conn).insert(tables.PostTerms.TableName)
            .columns(
                tables.PostTerms.typeId,
                tables.PostTerms.postTypeId,
                tables.PostTerms.mainId,
                tables.PostTerms.statusId,
                tables.PostTerms.order,
                tables.PostTerms.isFixed
            ).values(
                {value: params.typeId, valueType: QueryValueTypes.Number},
                {value: params.postTypeId, valueType: QueryValueTypes.Number},
                {value: params.mainId || 0, valueType: QueryValueTypes.Number},
                {value: params.statusId, valueType: QueryValueTypes.Number},
                {value: params.order, valueType: QueryValueTypes.Number},
                {value: params.isFixed, valueType: QueryValueTypes.Number},
            );

        return query.run();
    },
    update(params: UpdatePostTermParamDocument) {
        params = V.clearAllData(params);
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
            .where.in(
                {columnName: tables.PostTerms.id, value: params.termId, valueType: QueryValueTypes.Number}
            );

        if (params.typeId) query.where.equals({
            columnName: tables.PostTerms.typeId,
            value: params.typeId,
            valueType: QueryValueTypes.Number
        })
        if (params.postTypeId) query.where.equals({
            columnName: tables.PostTerms.postTypeId,
            value: params.postTypeId,
            valueType: QueryValueTypes.Number
        })

        return query.run();
    },
    delete(params: DeletePostTermParamDocument) {
        params = V.clearAllData(params);
        let query = new Mysql(db.conn).delete(tables.PostTerms.TableName)
            .where.in(
                {columnName: tables.PostTerms.id, value: params.termId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    }
};