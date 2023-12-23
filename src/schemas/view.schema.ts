import { object, string, ZodObject } from 'zod';
import {ErrorCodes} from "../library/api";

const postSchema: ZodObject<any> = object({
    body: object({
        langId: string().min(1, { message: ErrorCodes.emptyValue.toString() }),
        url: string().default(""),
    })
});

export default {
    post: postSchema
};