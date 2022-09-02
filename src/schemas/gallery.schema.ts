import {object, string, number, boolean, array, mixed} from "yup";
import {ErrorCodes} from "../utils/service";

export default {
    delete: {
        body: object({
            images: array(string().required({images: ErrorCodes.incorrectData})),
        })
    }
};