import { object, string } from "yup";
import {ErrorCodes} from "../library/api";

export default {
    get: object({
        params: object({
            name: string().required({name: ErrorCodes.emptyValue}),
        })
    })
};