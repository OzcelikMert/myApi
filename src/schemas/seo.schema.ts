import { object, number, boolean, string, array } from "yup";
import {ErrorCodes} from "../utils/ajax";

export default {
    get: object({
        query: object({
            langId: number().required({langId: ErrorCodes.emptyValue}),
        })
    }),
    put: object({
        body: object({
            langId: number().required({langId: ErrorCodes.emptyValue}),
            title: string(),
            content: string(),
            tags: array(string().required({tags: ErrorCodes.emptyValue})),
            separatorId: number(),
        })
    })
};