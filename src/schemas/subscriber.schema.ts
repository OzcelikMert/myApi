import { object, string, array } from "yup";
import {ErrorCodes} from "../library/api";

export default {
    getOne: object({
        params: object({
            _id: string().required({_id: ErrorCodes.emptyValue}),
        })
    }),
    getOneWithEmail: object({
        params: object({
            email: string().required({email: ErrorCodes.emptyValue}),
        })
    }),
    getMany: object({
        query: object({
            _id: array(string().required({_id: ErrorCodes.incorrectData})).default(undefined),
        })
    }),
    post: object({
        body: object({
            email: string().required({email: ErrorCodes.emptyValue}),
        })
    }),
    deleteMany: object({
        body: object({
            _id: array(string().required({_id: ErrorCodes.incorrectData})).required({_id: ErrorCodes.emptyValue}),
        })
    }),
    deleteOneWithEmail: object({
        params: object({
            email: string().required({email: ErrorCodes.emptyValue}),
        })
    })
};