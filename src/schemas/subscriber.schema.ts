import { object, string, array } from "yup";
import {ErrorCodes} from "../library/api";

export default {
    getOne: object({
        query: object({
            _id: string(),
            email: string()
        })
    }),
    getMany: object({
        query: object({
            _id: array(string().required({_id: ErrorCodes.incorrectData})).default(undefined),
            email: string()
        })
    }),
    post: object({
        body: object({
            email: string().required({email: ErrorCodes.emptyValue}),
        })
    }),
    deleteOne: object({
        query: object({
            email: string().required({email: ErrorCodes.emptyValue}),
            _id: string().required({_id: ErrorCodes.emptyValue})
        })
    }),
    deleteMany: object({
        body: object({
            _id: array(string().required({_id: ErrorCodes.incorrectData})).required({_id: ErrorCodes.emptyValue}),
        })
    })
};