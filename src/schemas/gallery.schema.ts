import { object, string, number, boolean, array, mixed } from "yup";
import {ErrorCodes} from "../utils/ajax";

export default {
    post: object({
        body: object({
            file: mixed().required({file: ErrorCodes.emptyValue}),
        })
    }),
    delete: object({
        body: object({
            images: array(string().required({images: ErrorCodes.incorrectData})),
        })
    })
};