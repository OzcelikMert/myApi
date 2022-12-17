import {object, string} from "yup";
import {ErrorCodes} from "../library/api";

export default {
    post: object({
        body: object({
            contactFormId: string().required({contactFormId: ErrorCodes.emptyValue}),
            email: string().required({email: ErrorCodes.emptyValue}).email({email: ErrorCodes.incorrectData}),
            message: string().required({message: ErrorCodes.emptyValue}),
            replyMessage: string()
        })
    })
};