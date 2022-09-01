import { object, string, number, boolean, array } from "yup";
import {ErrorCodes} from "../utils/service";

export default {
    get: object({
        params: object({
            userId: string(),
        })
    }),
    post: object({
        body: object({
            roleId: number().required({roleId: ErrorCodes.emptyValue}),
            statusId: number().required({statusId: ErrorCodes.emptyValue}),
            name: string().required({name: ErrorCodes.emptyValue}),
            email: string().required({email: ErrorCodes.emptyValue}).email({email: ErrorCodes.incorrectData}),
            password: string().required({password: ErrorCodes.emptyValue}),
            permissionId: array(number().required({permissionId: ErrorCodes.incorrectData})).required({permissionId: ErrorCodes.emptyValue})
        })
    }),
    put: object({
        params: object({
            userId: string().required({userId: ErrorCodes.emptyValue}),
        }).required({params: ErrorCodes.emptyValue}),
        body: object({
            roleId: number(),
            statusId: number(),
            name: string(),
            email: string().email({email: ErrorCodes.incorrectData}),
            password: string(),
            permissionId: array(number().required({permissionId: ErrorCodes.incorrectData})),
            banDateEnd: string(),
            banComment: string(),
        })
    }),
    delete: object({
        params: object({
            userId: string().required({userId: ErrorCodes.emptyValue}),
        }).required({params: ErrorCodes.emptyValue})
    })
};