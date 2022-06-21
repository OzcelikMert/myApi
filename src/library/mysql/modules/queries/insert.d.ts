import MySql, {QueryValueTypes} from "../../index";

interface InsertValuesDocument {
    value: any,
    valueType?: QueryValueTypes
}

interface InsertDocument {
    columns(...columnNames: string[]): InsertDocument,
    values(...columnNames: InsertValuesDocument[]): MySql,
}