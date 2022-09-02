import {object, string, boolean} from "yup";
import {ErrorCodes} from "../utils/service";

export default {
    get: {
        query: object({
            isRefresh: boolean()
        })
    },
    post: {
        body: object({
            email: string().required({email: ErrorCodes.emptyValue}).email({email: ErrorCodes.incorrectData}),
            password: string().required({password: ErrorCodes.emptyValue}),
        })
    }
};