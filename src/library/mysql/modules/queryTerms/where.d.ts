import {QueryTerms, QueryValueTypes} from "../../queryTerms";
import MySql from "../../index";

interface WhereParamDocument {
    columnName: string,
    value: any,
    valueType?: QueryValueTypes
}

interface WhereDocument {
    equals(...params: Array<WhereParamDocument>): MySql,
    notEquals(...params: Array<WhereParamDocument>): MySql,
    like(...params: Array<WhereParamDocument>): MySql,
    notLike(...params: Array<WhereParamDocument>): MySql,
    greaterThen(...params: Array<WhereParamDocument>): MySql,
    greaterEqualsThen(...params: Array<WhereParamDocument>): MySql,
    smallerThen(...params: Array<WhereParamDocument>): MySql,
    smallerEqualsThen(...params: Array<WhereParamDocument>): MySql,
}