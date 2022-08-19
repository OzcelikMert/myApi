import Mysql, {MySqlHelpers, QueryValueTypes} from "../library/mysql";
import db from "../config/db";
import tables from "../config/db/tables";
import {UpdateSetDocument} from "../library/mysql/modules/queries/update";
import V, {DateMask} from "../library/variable";
import NavigateDocument, {
    DeleteNavigateParamDocument,
    InsertNavigateParamDocument,
    SelectNavigateParamDocument,
    UpdateNavigateParamDocument
} from "../modules/services/navigate";

export default {
    select(params: SelectNavigateParamDocument): NavigateDocument[] {
        params = V.clearAllData(params);
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
    insert(params: InsertNavigateParamDocument) {
        params = V.clearAllData(params);
        let query = new Mysql(db.conn).insert(tables.Navigates.TableName)
            .columns(
                tables.Navigates.mainId,
                tables.Navigates.statusId,
                tables.Navigates.order
            ).values(
                {value: params.mainId || 0, valueType: QueryValueTypes.Number},
                {value: params.statusId, valueType: QueryValueTypes.Number},
                {value: params.order, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    update(params: UpdateNavigateParamDocument) {
        params = V.clearAllData(params);
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
            .where.in(
                {columnName: tables.Navigates.id, value: params.navigateId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    delete(params: DeleteNavigateParamDocument) {
        params = V.clearAllData(params);
        let query = new Mysql(db.conn).delete(tables.Navigates.TableName)
            .where.in(
                {columnName: tables.Navigates.id, value: params.navigateId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    }
};