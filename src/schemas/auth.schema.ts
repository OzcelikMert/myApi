import { object, string, boolean } from "yup";
import {ErrorCodes} from "../utils/service";

export default {
    get: object({
        query: object({
            isRefresh: boolean()
        })
    }),
    post: object({
        body: object({
            email: string().required({email: ErrorCodes.emptyValue}).email({email: ErrorCodes.incorrectData}),
            password: string().required({password: ErrorCodes.emptyValue}),
        })
    })
};