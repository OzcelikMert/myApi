import { object, string, array, boolean, number, ZodObject } from 'zod';
import {ErrorCodes} from "../library/api";

const postBody = object({
    elementId: string().min(1, { message: ErrorCodes.emptyValue.toString() }),
    langKey: string().min(1, { message: ErrorCodes.emptyValue.toString() }),
    types: (array(object({
        _id: string(),
        elementId: string().min(1, { message: ErrorCodes.emptyValue.toString() }),
        typeId: number().min(1, { message: ErrorCodes.emptyValue.toString() }),
        langKey: string().min(1, { message: ErrorCodes.emptyValue.toString() }),
        rank: number().min(1, { message: ErrorCodes.emptyValue.toString() }),
        contents: object({
            _id: string(),
            url: string(),
            comment: string(),
            langId: string().min(1, { message: ErrorCodes.emptyValue.toString() }),
            content: string()
        }).required()
    }))).default([])
});

const getSchema: ZodObject<any> = object({
    params: object({
        _id: string().min(1, { message: ErrorCodes.emptyValue.toString() }),
    }),
    query: object({
        _id: string(),
        elementId: string(),
        langId: string(),
    })
});

const getManySchema: ZodObject<any> = object({
    query: object({
        _id: array(string().min(1, { message: ErrorCodes.emptyValue.toString() })),
        elementId: array(string().min(1, { message: ErrorCodes.emptyValue.toString() })).default([]),
        langId: string()
    })
});

const postSchema: ZodObject<any> = object({
    body: postBody
});

const putSchema: ZodObject<any> = object({
    params: object({
        _id: string().min(1, { message: ErrorCodes.emptyValue.toString() }),
    }),
    body: postBody
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
    put: putSchema,
    deleteMany: deleteManySchema
};