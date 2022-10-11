import { object, number, boolean, string, array } from "yup";
import {ErrorCodes} from "../library/api";

export default {
    get: object({
        query: object({
            email: string(),
            _id: string(),
        })
    }),
    post: object({
        body: object({
            email: string().required({email: ErrorCodes.emptyValue}),
        })
    }),
    delete: object({
        body: object({
            _id: array(string().required({_id: ErrorCodes.incorrectData})).default(undefined),
        })
    }),
    deleteWithEmail: object({
        params: object({
            email: string().required({email: ErrorCodes.emptyValue}),
        })
    })
};