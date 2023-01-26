import { object, string} from "yup";
import {ErrorCodes} from "../library/api";

export default {
    post: object({
        body: object({
            langId: string().required({langId: ErrorCodes.emptyValue}),
            url: string().default(""),
        })
    })
};