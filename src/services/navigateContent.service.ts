import Mysql, {QueryValueTypes} from "../library/mysql";
import db from "../config/db";
import tables from "../config/db/tables";
import {UpdateSetDocument} from "../library/mysql/modules/queries/update";
import V, {DateMask} from "../library/variable";
import {
    DeleteNavigateContentParamDocument,
    InsertNavigateContentParamDocument,
    UpdateNavigateContentParamDocument
} from "../modules/services/navigateContent";

export default {
    insert(params: InsertNavigateContentParamDocument) {
        params = V.clearAllData(params, ["content"]);
        let query = new Mysql(db.conn).insert(tables.NavigateContents.TableName)
            .columns(
                tables.NavigateContents.navigateId,
                tables.NavigateContents.langId,
                tables.NavigateContents.title,
                tables.NavigateContents.url
            ).values(
                {value: params.navigateId, valueType: QueryValueTypes.Number},
                {value: params.langId, valueType: QueryValueTypes.Number},
                {value: params.title},
                {value: params.url},
            );

        return query.run();
    },
    update(params: UpdateNavigateContentParamDocument) {
        params = V.clearAllData(params, ["content"]);
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
    delete(params: DeleteNavigateContentParamDocument) {
        params = V.clearAllData(params);
        let query = new Mysql(db.conn).delete(tables.NavigateContents.TableName)
            .where.equals(
                {columnName: tables.NavigateContents.navigateId, value: params.navigateId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    }
};