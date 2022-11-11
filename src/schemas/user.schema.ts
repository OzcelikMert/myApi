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
    putProfile: object({
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
    delete: object({
        params: object({
            userId: string().required({userId: ErrorCodes.emptyValue}),
        })
    })
};