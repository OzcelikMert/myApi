import { object, string} from "yup";
import {ErrorCodes} from "../library/api";

export default {
    post: object({
        body: object({
            lang: string().required({lang: ErrorCodes.emptyValue}),
            url: string().default(""),
        })
    })
};