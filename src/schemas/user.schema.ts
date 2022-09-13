import { object, string, number, boolean, array } from "yup";
import {ErrorCodes} from "../library/api";

const postBody = {
    roleId: number().required({roleId: ErrorCodes.emptyValue}),
    statusId: number().required({statusId: ErrorCodes.emptyValue}),
    name: string().required({name: ErrorCodes.emptyValue}),
    email: string().required({email: ErrorCodes.emptyValue}).email({email: ErrorCodes.incorrectData}),
    password: string().required({password: ErrorCodes.emptyValue}),
    permissions: array(number().required({permissions: ErrorCodes.incorrectData})),
    banDateEnd: string(),
    banComment: string(),
};

export default {
    get: object({
        params: object({
            userId: string(),
        })
    }),
    post: object({
        body: object(postBody)
    }),
    put: object({
        params: object({
            userId: string().required({userId: ErrorCodes.emptyValue}),
        }),
        body: object({
            ...postBody,
            password: string()
        })
    }),
    delete: object({
        params: object({
            userId: string().required({userId: ErrorCodes.emptyValue}),
        })
    })
};