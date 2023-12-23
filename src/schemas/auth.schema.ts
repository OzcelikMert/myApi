import { object, string, ZodObject } from 'zod';
import {ErrorCodes} from "../library/api";

const getSchema: ZodObject<any> = object({
    query: object({})
});

const postSchema: ZodObject<any> = object({
    body: object({
        email: string().min(1, { message: ErrorCodes.emptyValue.toString() }).email({ message: ErrorCodes.incorrectData.toString() }),
        password: string().min(1,{ message: ErrorCodes.emptyValue.toString() }),
    }),
});

export default {
  get: getSchema,
  post: postSchema
};