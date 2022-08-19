import MySql from "../../index";

interface SelectDocument {
    columns(...args: string[]): MySql,
    columnsWithArray(args: string[]): MySql,
}