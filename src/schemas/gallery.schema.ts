import {object, string, number, boolean, array, mixed} from "yup";
import {ErrorCodes} from "../library/api";

export default {
    delete: object({
        body: object({
            images: array(string().required({images: ErrorCodes.incorrectData})),
        })
    })
};