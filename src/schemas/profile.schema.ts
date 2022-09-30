import {object, string, number, boolean, array} from "yup";
import {ErrorCodes} from "../library/api";

export default {
    put: object({
        body: object({
            image: string(),
            name: string(),
            comment: string(),
            phone: string(),
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
