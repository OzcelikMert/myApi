import { object, number, boolean, string, array } from "yup";
import {ErrorCodes} from "../utils/service";

export default {
    get: {
        query: object({
            langId: number().required({langId: ErrorCodes.emptyValue}),
        })
    },
    put: {
        body: object({
            langId: number().required({langId: ErrorCodes.emptyValue}),
            title: string(),
            content: string(),
            tags: array(string().required({tags: ErrorCodes.emptyValue})),
            separatorId: number(),
        })
    }
};