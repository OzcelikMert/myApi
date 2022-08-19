import Mysql, {QueryValueTypes} from "../library/mysql";
import db from "../config/db";
import tables from "../config/db/tables";
import {UpdateSetDocument} from "../library/mysql/modules/queries/update";
import V, {DateMask} from "../library/variable";
import SeoDocument, {
    InsertSeoParamDocument,
    SelectSeoParamDocument,
    UpdateSeoParamDocument
} from "../modules/services/seo";

export default {
    select(params: SelectSeoParamDocument): SeoDocument[] {
        params = V.clearAllData(params);
        let query = new Mysql(db.conn).select(tables.SeoContents.TableName)
            .columns(`*`)
            .where.equals({
                columnName: tables.SeoContents.langId,
                value: params.langId,
                valueType: QueryValueTypes.Number
            });

        return query.run().map((seo: SeoDocument) => {
            seo.seoContentTags = JSON.parse(seo.seoContentTags);
            return seo;
        });
    },
    insert(params: InsertSeoParamDocument) {
        params = V.clearAllData(params);
        if(!params.tags || params.tags === [""]) params.tags = [];
        let query = new Mysql(db.conn).insert(tables.SeoContents.TableName)
            .columns(
                tables.SeoContents.langId,
                tables.SeoContents.title,
                tables.SeoContents.content,
                tables.SeoContents.tags,
            ).values(
                {value: params.langId, valueType: QueryValueTypes.Number},
                {value: params.title || ""},
                {value: params.content || ""},
                {value: JSON.stringify(params.tags)}
            );

        return query.run();
    },
    update(params: UpdateSeoParamDocument) {
        params = V.clearAllData(params);
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
    }
};