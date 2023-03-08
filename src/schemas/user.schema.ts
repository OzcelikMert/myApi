import { object, string, number, array } from "yup";
import {ErrorCodes} from "../library/api";

const postBody = {
    roleId: number().required({roleId: ErrorCodes.emptyValue}),
    statusId: number().required({statusId: ErrorCodes.emptyValue}),
    name: string().min(3, {name: ErrorCodes.incorrectData}).required({name: ErrorCodes.emptyValue}),
    email: string().required({email: ErrorCodes.emptyValue}).email({email: ErrorCodes.incorrectData}),
    password: string().required({password: ErrorCodes.emptyValue}),
    permissions: array(number().required({permissions: ErrorCodes.incorrectData})).required({permissions: ErrorCodes.emptyValue}),
    banDateEnd: string(),
    banComment: string(),
};

export default {
    getOne: object({
        query: object({
            _id: string(),
            url: string(),
            statusId: number(),
        }),
    }),
    getMany: object({
        query: object({
            _id: array(string().required({_id: ErrorCodes.incorrectData})).default(undefined),
            statusId: number(),
            email: string(),
            count: number(),
            page: number(),
        })
    }),
    post: object({
        body: object(postBody)
    }),
    putOne: object({
        params: object({
            _id: string().required({_id: ErrorCodes.emptyValue}),
        }),
        body: object({
            ...postBody,
            password: string()
        })
    }),
    putProfile: object({
        body: object({
            image: string(),
            name: string().required({name: ErrorCodes.incorrectData}),
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
    deleteOne: object({
        params: object({
            _id: string().required({_id: ErrorCodes.emptyValue}),
        })
    })
};