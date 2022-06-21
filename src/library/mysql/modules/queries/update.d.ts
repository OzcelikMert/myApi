import MySql, {QueryValueTypes} from "../../index";

interface UpdateSetDocument {
    columnName: string
    value: any
    valueType?: QueryValueTypes
}

interface UpdateDocument {
    set(...setData: UpdateSetDocument[]): MySql,
    setWithArray(setData: UpdateSetDocument[]): MySql,
}