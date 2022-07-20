import { object, number, boolean, string, array } from "yup";
import {ErrorCodes} from "../utils/ajax";

export default {
    get: object({
        query: object({
            id: number(),
        })
    })
};