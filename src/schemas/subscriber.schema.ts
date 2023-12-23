import { object, string, array, ZodObject } from 'zod';
import {ErrorCodes} from "../library/api";

const getSchema: ZodObject<any> = object({
    query: object({
        _id: string(),
        email: string().email({ message: ErrorCodes.incorrectData.toString() })
    })
});

const getManySchema: ZodObject<any> = object({
    query: object({
        _id: array(string().min(1, { message: ErrorCodes.emptyValue.toString() })).default([]),
        email: string().email({ message: ErrorCodes.incorrectData.toString() })
    }),
});

const postSchema: ZodObject<any> = object({
    body: object({
        email: string().min(1, { message: ErrorCodes.emptyValue.toString() }).email({ message: ErrorCodes.incorrectData.toString() }),
    })
});

const deleteSchema: ZodObject<any> = object({
    query: object({
        email: string().min(1, { message: ErrorCodes.emptyValue.toString() }).email({ message: ErrorCodes.incorrectData.toString() }),
        _id: string().min(1, { message: ErrorCodes.emptyValue.toString() })
    })
});

const deleteManySchema: ZodObject<any> = object({
    body: object({
        _id: array(string().min(1, { message: ErrorCodes.emptyValue.toString() })).min(1, { message: ErrorCodes.emptyValue.toString() }),
    })
});

export default {
    get: getSchema,
    getMany: getManySchema,
    post: postSchema,
    delete: deleteSchema,
    deleteMany: deleteManySchema
};