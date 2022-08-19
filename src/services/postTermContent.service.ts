import Mysql, {QueryValueTypes} from "../library/mysql";
import db from "../config/db";
import tables from "../config/db/tables";
import {UpdateSetDocument} from "../library/mysql/modules/queries/update";
import V, {DateMask} from "../library/variable";
import PostTermContentDocument, {
    DeletePostTermContentParamDocument,
    InsertPostTermContentParamDocument, SelectPostTermContentParamDocument,
    UpdatePostTermContentParamDocument
} from "../modules/services/postTermContent";

export default {
    select(params: SelectPostTermContentParamDocument) : PostTermContentDocument[] {
        params = V.clearAllData(params);
        let query = new Mysql(db.conn).select(tables.PostTermContents.TableName)
            .columns("*")
            .where.equals(
                {columnName: tables.PostTermContents.termId, value: params.termId, valueType: QueryValueTypes.Number},
                {columnName: tables.PostTermContents.langId, value: params.langId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    insert(params: InsertPostTermContentParamDocument) {
        params = V.clearAllData(params, ["content"]);
        let query = new Mysql(db.conn).insert(tables.PostTermContents.TableName)
            .columns(
                tables.PostTermContents.termId,
                tables.PostTermContents.langId,
                tables.PostTermContents.image,
                tables.PostTermContents.title,
                tables.PostTermContents.url,
                tables.PostTermContents.seoTitle,
                tables.PostTermContents.seoContent
            ).values(
                {value: params.termId, valueType: QueryValueTypes.Number},
                {value: params.langId, valueType: QueryValueTypes.Number},
                {value: params.image || ""},
                {value: params.title},
                {value: params.url || ""},
                {value: params.seoTitle || ""},
                {value: params.seoContent || ""}
            );

        return query.run();
    },
    update(params: UpdatePostTermContentParamDocument) {
        params = V.clearAllData(params, ["content"]);
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
    delete(params: DeletePostTermContentParamDocument) {
        params = V.clearAllData(params);
        let query = new Mysql(db.conn).delete(tables.PostTermContents.TableName)
            .where.in(
                {columnName: tables.PostTermContents.termId, value: params.termId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    }
};