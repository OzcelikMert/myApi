import MySql from "../../index";

interface SelectDocument {
    columns(...columnNames: string[]): MySql,
    columnsWithArray(columnNames: string[]): MySql,
}