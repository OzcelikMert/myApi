import {object, string, boolean} from "yup";
import {ErrorCodes} from "../library/api";

export default {
    get: object({
        query: object({

        })
    }),
    post: object({
        body: object({
            email: string().required({email: ErrorCodes.emptyValue}).email({email: ErrorCodes.incorrectData}),
            password: string().required({password: ErrorCodes.emptyValue}),
        })
    })
};