import { object, number, ZodObject } from 'zod';
import {ErrorCodes} from "../library/api";

const getPostTermSchema: ZodObject<any> = object({
    query: object({
        typeId: number().min(1, { message: ErrorCodes.emptyValue.toString() }),
        postTypeId: number().min(1, { message: ErrorCodes.emptyValue.toString() }),
        page: number(),
    })
});

const getPostSchema: ZodObject<any> = object({
    query: object({
        typeId: number().min(1, { message: ErrorCodes.emptyValue.toString() }),
        page: number(),
    })
});

export default {
    getPostTerm: getPostTermSchema,
    getPost: getPostSchema
};