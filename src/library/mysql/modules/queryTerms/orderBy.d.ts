import MySql from "../../index";

interface OrderByDocument {
    asc(...columnNames: string[]): MySql,
    desc(...columnNames: string[]): MySql,
}