import LanguageDocument, {SelectLanguageParamDocument} from "../../types/services/language";
import Mysql, {QueryValueTypes} from "../../library/mysql";
import db from "../../config/db";
import tables from "../../config/db/tables";
import V from "../../library/variable";
import Statement from "../../library/statement";

export default {
    select(params: SelectLanguageParamDocument): LanguageDocument[] {
        params = V.clearAllData(params);
        let query = new Mysql(db.conn).select(tables.Languages.TableName)
            .columns(`*`);

        if (params.id) query.where.equals({
            columnName: tables.Languages.id,
            value: params.id,
            valueType: QueryValueTypes.Number
        });

        return query.run();
    }
};