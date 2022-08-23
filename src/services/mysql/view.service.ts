import Mysql, {MySqlHelpers, QueryValueTypes} from "../../library/mysql";
import db from "../../config/db";
import tables from "../../config/db/tables";
import V, {DateMask} from "../../library/variable";
import ViewDocument, {
    DeleteViewParamDocument,
    InsertViewParamDocument,
    SelectViewParamDocument,
    ViewTotalDocument, ViewTotalForCountryDocument, ViewTotalForDateDocument
} from "../../modules/services/view";

export default {
    select(params: SelectViewParamDocument): ViewDocument[] {
        params = V.clearAllData(params);
        let query = new Mysql(db.conn).select(tables.Views.TableName)
            .columns("*");

        if (params.ip) query.where.equals({
            columnName: tables.Views.ip,
            value: params.ip
        });
        if (params.url) query.where.like({
            columnName: tables.Views.url,
            value: `%${params.url}%`
        });
        if (params.lang) query.where.equals({
            columnName: tables.Views.lang,
            value: params.lang
        });
        if (params.city) query.where.equals({
            columnName: tables.Views.city,
            value: params.city
        });
        if (params.country) query.where.equals({
            columnName: tables.Views.country,
            value: params.country
        });
        if (params.region) query.where.equals({
            columnName: tables.Views.region,
            value: params.region
        });
        if (params.date) query.where.equals({
            columnName: tables.Views.date,
            value: new Date(params.date).getStringWithMask(DateMask.DATE)
        });
        if (params.dateStart) query.where.greaterThen({
            columnName: tables.Views.date,
            value: new Date(params.dateStart).getStringWithMask(DateMask.DATE)
        });
        if (params.dateEnd) query.where.smallerThen({
            columnName: tables.Views.date,
            value: new Date(params.dateEnd).getStringWithMask(DateMask.DATE)
        });

        return query.run();
    },
    selectTotal(params: SelectViewParamDocument): ViewTotalDocument[] {
        params = V.clearAllData(params);
        let query = new Mysql(db.conn).select(tables.Views.TableName)
            .columns(
                MySqlHelpers.asName(
                    MySqlHelpers.count("*"),
                    "total"
                )
            );

        if (params.dateStart) query.where.greaterThen({
            columnName: tables.Views.date,
            value: new Date(params.dateStart).getStringWithMask(DateMask.DATE)
        });
        if (params.dateEnd) query.where.smallerThen({
            columnName: tables.Views.date,
            value: new Date(params.dateEnd).getStringWithMask(DateMask.DATE)
        });

        return query.run();
    },
    selectTotalForDate(params: SelectViewParamDocument): ViewTotalForDateDocument[] {
        params = V.clearAllData(params);
        let query = new Mysql(db.conn).select(tables.Views.TableName)
            .columns(
                tables.Views.date,
                MySqlHelpers.asName(
                    MySqlHelpers.count("*"),
                    "total"
                )
            ).groupBy(tables.Views.date);

        if (params.dateStart) query.where.greaterThen({
            columnName: tables.Views.date,
            value: new Date(params.dateStart).getStringWithMask(DateMask.DATE)
        });

        return query.run();
    },
    selectTotalForCountry(params: SelectViewParamDocument): ViewTotalForCountryDocument[] {
        params = V.clearAllData(params);
        let query = new Mysql(db.conn).select(tables.Views.TableName)
            .columns(
                tables.Views.country,
                MySqlHelpers.asName(
                    MySqlHelpers.count("*"),
                    "total"
                )
            ).groupBy(tables.Views.country);

        if (params.dateStart) query.where.greaterThen({
            columnName: tables.Views.date,
            value: new Date(params.dateStart).getStringWithMask(DateMask.DATE)
        });

        return query.run();
    },
    insert(params: InsertViewParamDocument) {
        params = V.clearAllData(params);
        let query = new Mysql(db.conn).insert(tables.Views.TableName)
            .columns(
                tables.Views.ip,
                tables.Views.url,
                tables.Views.lang,
                tables.Views.country,
                tables.Views.city,
                tables.Views.region,
                tables.Views.date,
            ).values(
                {value: params.ip},
                {value: params.url},
                {value: params.lang},
                {value: params.country || ""},
                {value: params.city || ""},
                {value: params.region || ""},
                {value: new Date().getStringWithMask(DateMask.DATE)}
            );

        return query.run();
    },
    delete(params: DeleteViewParamDocument) {
        params = V.clearAllData(params);
        let query = new Mysql(db.conn).delete(tables.Views.TableName)
            .where.smallerThen(
                {columnName: tables.Views.date, value:  new Date(params.dateEnd).getStringWithMask(DateMask.DATE)}
            )

        return query.run();
    }
};