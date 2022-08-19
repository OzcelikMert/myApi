import { object, number, boolean, string, array } from "yup";
import {ErrorCodes} from "../utils/service";

export default {
    get: object({
        query: object({
            id: number(),
        })
    }),
    put: object({
        body: object({
            settings: array(object({
                id: number().required({id: ErrorCodes.emptyValue}),
                value: string().required({value: ErrorCodes.emptyValue})
            }).required({settings: ErrorCodes.incorrectData})).required({settings: ErrorCodes.emptyValue})
        })
    })
};