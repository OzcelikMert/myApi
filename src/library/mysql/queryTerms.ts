import V from "../variable"
import {WhereParamDocument, JoinParamDocument, JoinDocument, WhereDocument} from "./modules/queryTerms/";
import MySql from "./index";


export enum QueryValueTypes {
    String,
    Number,
    Bool,
    Sql
}

export class QueryTerms {
    protected queryWhere: string = "";
    protected queryJoin: string = "";
    protected queryGroupBy: string = "";
    protected queryOrderBy: string = "";
    protected queryLimit: string = "";

    public get where(): WhereDocument {
        let self: any = this;

        function setQuery(operator: string, params: Array<WhereParamDocument>){
            self.queryWhere = (!V.isEmpty(self.queryWhere)) ? `${self.queryWhere} and ` : "where ";
            self.queryWhere += `(`;
            for (let i = 0; i < params.length; i++){
                let param = params[i];
                self.queryWhere += `${param.columnName} ${operator} ${self.convertValueTypeToQuery(param.value, param.valueType)} and `;
            }
            self.queryWhere =  `${self.queryWhere.removeLastChar(4)}) `;
            return self;
        }

        return {
            equals(...params) { return setQuery("=", params); },
            notEquals(...params) { return setQuery("!=", params); },
            like(...params) { return setQuery("like", params); },
            notLike(...params) { return setQuery("not like", params); },
            greaterThen(...params) { return setQuery(">", params); },
            greaterEqualsThen(...params) { return setQuery(">=", params); },
            smallerThen(...params) { return setQuery("<", params); },
            smallerEqualsThen(...params) { return setQuery("<=", params); },
        }
    }

    public get join(): JoinDocument {
        let self: any = this;

        function setQuery(operator: string, params: Array<JoinParamDocument>){
            for (let i = 0; i < params.length; i++){
                let param = params[i];
                self.queryJoin += `${operator} join ${param.tableName} on `;
                for (let i = 0; i < param.on.length; i++){
                    let on = param.on[i];
                    on.valueType = (V.isEmpty(on.valueType)) ? QueryValueTypes.Sql : on.valueType;
                    self.queryJoin += `${on.columnName} = ${self.convertValueTypeToQuery(on.value, on.valueType)} and `;
                }
                self.queryJoin =  `${self.queryJoin.removeLastChar(4)} `;
            }
            return self;
        }

        return {
            inner(...params) { return setQuery("inner", params); },
            left(...params) { return setQuery("left", params); },
            right(...params) { return setQuery("right", params); }
        }
    }

    public groupBy(...columnNames: string[]) : MySql {
        this.queryGroupBy = (!V.isEmpty(this.queryGroupBy)) ? `${this.queryGroupBy}, ` : "group by ";

        for (let i = 0; i < columnNames.length; i++){
            let columnName = columnNames[i];
            this.queryGroupBy += `${columnName},`;
        }
        this.queryGroupBy =  `${this.queryGroupBy.removeLastChar()}`;

        let self: any = this;
        return self;
    }

    protected convertValueTypeToQuery(value: any, valueType?: QueryValueTypes): string {
        let result = "";
        switch (valueType) {
            case QueryValueTypes.Bool:
            case QueryValueTypes.Sql:
            case QueryValueTypes.Number: result = value; break;
            default:
            case QueryValueTypes.String: result = `'${value}'`; break;
        }
        return result;
    }
}