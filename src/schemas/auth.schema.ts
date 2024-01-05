import {object, string, ZodObject, ZodType} from 'zod';
import {ErrorCodes} from "../library/api";
import {AuthSchemaPostBody} from "../types/schemas/auth.schema";

const getSchema = object({
    query: object({})
});

const postSchema = object({
    body: object({
        email: string().min(1, { message: ErrorCodes.emptyValue.toString() }).email({ message: ErrorCodes.incorrectData.toString() }),
        password: string().min(1,{ message: ErrorCodes.emptyValue.toString() }),
    }) as ZodType<AuthSchemaPostBody>,
});

export default {
  get: getSchema,
  post: postSchema
};