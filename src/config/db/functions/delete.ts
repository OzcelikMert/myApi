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
    PostTermLinks({postId = 0}){
        let query = new Mysql(db.conn).delete(tables.PostTermLinks.TableName)
            .where.equals(
                {columnName: tables.PostTermLinks.postId, value: postId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
}

export default Delete;