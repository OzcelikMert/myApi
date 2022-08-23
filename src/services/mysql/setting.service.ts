import Mysql, {QueryValueTypes} from "../../library/mysql";
import db from "../../config/db";
import tables from "../../config/db/tables";
import V, {DateMask} from "../../library/variable";
import SettingDocument, {
    InsertSettingParamDocument,
    SelectSettingParamDocument,
    UpdateSettingParamDocument
} from "../../modules/services/setting";

export default {
    select(params: SelectSettingParamDocument): SettingDocument[] {
        params = V.clearAllData(params);
        let query = new Mysql(db.conn).select(tables.Settings.TableName)
            .columns(`*`);

        if (params.id) query.where.equals({
            columnName: tables.Settings.id,
            value: params.id,
            valueType: QueryValueTypes.Number
        });

        return query.run();
    },
    insert(params: InsertSettingParamDocument) {
        params = V.clearAllData(params);
        let query = new Mysql(db.conn).insert(tables.Settings.TableName)
            .columns(
                tables.Settings.id,
                tables.Settings.value
            ).values(
                {value: params.id, valueType: QueryValueTypes.Number},
                {value: params.value},
            );

        return query.run();
    },
    update(params: UpdateSettingParamDocument) {
        params = V.clearAllData(params);
        let query = new Mysql(db.conn).update(tables.Settings.TableName)
            .set(
                {columnName: tables.Settings.value, value: params.value}
            ).where.equals(
                {columnName: tables.Settings.id, value: params.id, valueType: QueryValueTypes.Number}
            );

        return query.run();
    }
};