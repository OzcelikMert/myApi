import {WhereParamDocument} from "./where";
import MySql from "../../index";

interface JoinParamDocument {
    tableName: string,
    on: WhereParamDocument[]
}

interface JoinDocument {
    inner(...params: Array<JoinParamDocument>): MySql,
    left(...params: Array<JoinParamDocument>): MySql,
    right(...params: Array<JoinParamDocument>): MySql
}