import {object, string, number, boolean, array} from "yup";
import {ErrorCodes} from "../utils/service";

export default {
    put: object({
        body: object({
            image: string(),
            name: string().required({name: ErrorCodes.emptyValue}),
            comment: string(),
            phone: string().min(10, {phone: ErrorCodes.incorrectData}).max(15, {phone: ErrorCodes.incorrectData}),
            facebook: string().url({facebook: ErrorCodes.incorrectData}),
            instagram: string().url({instagram: ErrorCodes.incorrectData}),
            twitter: string().url({twitter: ErrorCodes.incorrectData})
        })
    }),
    putPassword: object({
        body: object({
            password: string().required({password: ErrorCodes.emptyValue}),
            newPassword: string().required({newPassword: ErrorCodes.emptyValue})
        })
    }),
};
