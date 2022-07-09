import tables from "../tables";
import db from "../";
import Mysql, {QueryValueTypes} from "../../../library/mysql";

const Delete = {
    PostTerm({termId = 0}){
        let query = new Mysql(db.conn).delete(tables.PostTerms.TableName)
            .where.equals(
                {columnName: tables.PostTerms.id, value: termId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    PostTermContent({termId = 0}){
        let query = new Mysql(db.conn).delete(tables.PostTermContents.TableName)
            .where.equals(
                {columnName: tables.PostTermContents.termId, value: termId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    Post({postId = 0}){
        let query = new Mysql(db.conn).delete(tables.Posts.TableName)
            .where.equals(
                {columnName: tables.Posts.id, value: postId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    PostContent({postId = 0}){
        let query = new Mysql(db.conn).delete(tables.PostContents.TableName)
            .where.equals(
                {columnName: tables.PostContents.postId, value: postId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    PostTermLinks({postId = 0}){
        let query = new Mysql(db.conn).delete(tables.PostTermLinks.TableName)
            .where.equals(
                {columnName: tables.PostTermLinks.postId, value: postId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    Navigate({navigateId = 0}){
        let query = new Mysql(db.conn).delete(tables.Navigates.TableName)
            .where.equals(
                {columnName: tables.Navigates.id, value: navigateId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    NavigateContent({navigateId = 0}){
        let query = new Mysql(db.conn).delete(tables.NavigateContents.TableName)
            .where.equals(
                {columnName: tables.NavigateContents.navigateId, value: navigateId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
}

export default Delete;