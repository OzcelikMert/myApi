import tables from "../tables";
import db from "../";
import Mysql, {QueryValueTypes} from "../../../library/mysql";
import {
    DeletePostTermContentParamDocument, DeletePostTermLinkParamDocument,
    DeletePostTermParamDocument
} from "../../../modules/config/db/functions/delete/postTerm";
import {
    DeletePostContentParamDocument,
    DeletePostParamDocument
} from "../../../modules/config/db/functions/delete/post";
import {
    DeleteNavigateContentParamDocument,
    DeleteNavigateParamDocument
} from "../../../modules/config/db/functions/delete/navigate";

const Delete = {
    PostTerm(params: DeletePostTermParamDocument){
        let query = new Mysql(db.conn).delete(tables.PostTerms.TableName)
            .where.equals(
                {columnName: tables.PostTerms.id, value: params.termId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    PostTermContent(params: DeletePostTermContentParamDocument){
        let query = new Mysql(db.conn).delete(tables.PostTermContents.TableName)
            .where.equals(
                {columnName: tables.PostTermContents.termId, value: params.termId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    PostTermLinks(params: DeletePostTermLinkParamDocument){
        let query = new Mysql(db.conn).delete(tables.PostTermLinks.TableName)
            .where.equals(
                {columnName: tables.PostTermLinks.postId, value: params.postId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    Post(params: DeletePostParamDocument){
        let query = new Mysql(db.conn).delete(tables.Posts.TableName)
            .where.equals(
                {columnName: tables.Posts.id, value: params.postId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    PostContent(params: DeletePostContentParamDocument){
        let query = new Mysql(db.conn).delete(tables.PostContents.TableName)
            .where.equals(
                {columnName: tables.PostContents.postId, value: params.postId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    Navigate(params: DeleteNavigateParamDocument){
        let query = new Mysql(db.conn).delete(tables.Navigates.TableName)
            .where.equals(
                {columnName: tables.Navigates.id, value: params.navigateId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    NavigateContent(params: DeleteNavigateContentParamDocument){
        let query = new Mysql(db.conn).delete(tables.NavigateContents.TableName)
            .where.equals(
                {columnName: tables.NavigateContents.navigateId, value: params.navigateId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
}

export default Delete;