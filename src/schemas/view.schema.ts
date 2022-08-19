import { object, number, boolean, string, array } from "yup";
import {ErrorCodes} from "../utils/service";

export default {
    post: object({
        body: object({
            lang: string().required({lang: ErrorCodes.emptyValue}),
            url: string().required({url: ErrorCodes.emptyValue}),
        })
    })
};