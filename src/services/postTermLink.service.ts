import Mysql, {QueryValueTypes} from "../library/mysql";
import db from "../config/db";
import tables from "../config/db/tables";
import V from "../library/variable";
import {DeletePostTermLinkParamDocument, InsertPostTermLinkParamDocument} from "../modules/services/postTermLink";
import {InsertValuesDocument} from "../library/mysql/modules/queries";

export default {
    insert(params: InsertPostTermLinkParamDocument[]){
        params = V.clearAllData(params);

        let query = new Mysql(db.conn).insert(tables.PostTermLinks.TableName)
            .columns(
                tables.PostTermLinks.postId,
                tables.PostTermLinks.termId
            ).valuesMulti(params.map(param => (
                [
                    {value: param.postId, valueType: QueryValueTypes.Number},
                    {value: param.termId, valueType: QueryValueTypes.Number}
                ]
            )));

        return query.run();
    },
    delete(params: DeletePostTermLinkParamDocument){
        params = V.clearAllData(params);
        if(!params.postId && !params.termId) return false;

        let query = new Mysql(db.conn).delete(tables.PostTermLinks.TableName);

        if(params.postId) query.where.in({columnName: tables.PostTermLinks.postId, value: params.postId, valueType: QueryValueTypes.Number});
        if(params.termId) query.where.in({columnName: tables.PostTermLinks.termId, value: params.termId, valueType: QueryValueTypes.Number});

        return query.run();
    }
};