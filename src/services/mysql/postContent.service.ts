import Mysql, {QueryValueTypes} from "../../library/mysql";
import db from "../../config/db";
import tables from "../../config/db/tables";
import {UpdateSetDocument} from "../../library/mysql/modules/queries/update";
import V from "../../library/variable";
import PostContentDocument, {
    DeletePostContentParamDocument,
    InsertPostContentParamDocument,
    SelectPostContentParamDocument,
    UpdatePostContentParamDocument
} from "../../types/services/postContent";

export default {
    select(params: SelectPostContentParamDocument) : PostContentDocument[] {
        params = V.clearAllData(params);
        let query = new Mysql(db.conn).select(tables.PostContents.TableName)
            .columns("*")
            .where.equals(
                {columnName: tables.PostContents.postId, value: params.postId, valueType: QueryValueTypes.Number},
                {columnName: tables.PostContents.langId, value: params.langId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    insert(params: InsertPostContentParamDocument) {
        params = V.clearAllData(params, ["content"]);
        let query = new Mysql(db.conn).insert(tables.PostContents.TableName)
            .columns(
                tables.PostContents.postId,
                tables.PostContents.langId,
                tables.PostContents.image,
                tables.PostContents.title,
                tables.PostContents.shortContent,
                tables.PostContents.content,
                tables.PostContents.url,
                tables.PostContents.seoTitle,
                tables.PostContents.seoContent
            ).values(
                {value: params.postId, valueType: QueryValueTypes.Number},
                {value: params.langId, valueType: QueryValueTypes.Number},
                {value: params.image || ""},
                {value: params.title},
                {value: params.shortContent || ""},
                {value: params.content || ""},
                {value: params.url || ""},
                {value: params.seoTitle || ""},
                {value: params.seoContent || ""}
            );

        return query.run();
    },
    update(params: UpdatePostContentParamDocument) {
        params = V.clearAllData(params, ["content"]);
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
    delete(params: DeletePostContentParamDocument) {
        params = V.clearAllData(params);
        let query = new Mysql(db.conn).delete(tables.PostContents.TableName)
            .where.in(
                {columnName: tables.PostContents.postId, value: params.postId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    }
};