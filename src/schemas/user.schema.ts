import { object, string, number, boolean, array } from "yup";
import {ErrorCodes} from "../utils/service";

const postBody = object({
    roleId: number().required({roleId: ErrorCodes.emptyValue}),
    statusId: number().required({statusId: ErrorCodes.emptyValue}),
    name: string().required({name: ErrorCodes.emptyValue}),
    email: string().required({email: ErrorCodes.emptyValue}).email({email: ErrorCodes.incorrectData}),
    password: string().required({password: ErrorCodes.emptyValue}),
    permissionId: array(number().required({permissionId: ErrorCodes.incorrectData})).required({permissionId: ErrorCodes.emptyValue}),
    banDateEnd: string(),
    banComment: string(),
});

export default {
    get: {
        params: object({
            userId: string(),
        })
    },
    post: {
        body: postBody
    },
    put: {
        params: object({
            userId: string().required({userId: ErrorCodes.emptyValue}),
        }),
        body: postBody
    },
    delete: {
        params: object({
            userId: string().required({userId: ErrorCodes.emptyValue}),
        })
    }
};