import V from "../variable"
import {QueryTerms, QueryValueTypes} from "./queryTerms";
import {InsertDocument, SelectDocument} from "./modules/queries/";
import MySql from "./index";
import {UpdateDocument} from "./modules/queries/update";

export enum QueryTypes {
    Select,
    Insert,
    Update,
    Delete
}

export class Queries extends QueryTerms{
    protected queryType: QueryTypes = QueryTypes.Select;
    protected queryTableName: string = "";
    protected queryColumn: string = "";
    protected queryValues: string = "";

    public select(tableName: string): SelectDocument {
        this.queryType = QueryTypes.Select;
        this.queryTableName = tableName;
        let self: any = this;
        return {
            columns(...values): MySql {
                self.queryColumn = ``;
                for (let i = 0; i < values.length; i++){
                    self.queryColumn += `${values[i]},`;
                }
                self.queryColumn = self.queryColumn.removeLastChar();
                return self;
            },
            columnsWithArray(columnNames) { return this.columns.apply(this.columns, columnNames); }
        }
    }

    public insert(tableName: string) : InsertDocument {
        this.queryType = QueryTypes.Insert;
        this.queryTableName = tableName;
        let self: any = this;
        return {
            columns(...values) {
                self.queryColumn = ``;
                for (let i = 0; i < values.length; i++){
                    self.queryColumn += `${values[i]},`;
                }
                self.queryColumn = self.queryColumn.removeLastChar();
                return this;
            },
            values(...values) {
                self.queryValues = ``;
                for (let i = 0; i < values.length; i++){
                    let value = values[i];
                    self.queryValues += `${self.convertValueTypeToQuery(value.value, value.valueType)},`;
                }
                self.queryValues = self.queryValues.removeLastChar();
                return self;
            }
        }
    }

    public update(tableName: string) : UpdateDocument {
        this.queryType = QueryTypes.Update;
        this.queryTableName = tableName;
        let self: any = this;
        return {
            set(...values) {
                self.queryColumn = ``;
                for (let i = 0; i < values.length; i++){
                    let value = values[i];
                    self.queryColumn += `${value.columnName}=${self.convertValueTypeToQuery(value.value, value.valueType)},`;
                }
                self.queryColumn = self.queryColumn.removeLastChar();
                return self;
            },
            setWithArray(values) { return this.set.apply(this.set, values); }
        }
    }

    public delete(tableName: string) : MySql {
        this.queryType = QueryTypes.Delete;
        this.queryTableName = tableName;
        let self: any = this;
        return self;
    }
}