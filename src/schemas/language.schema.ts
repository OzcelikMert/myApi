import {number, object, string} from "yup";
import {ErrorCodes} from "../library/api";

const postBody = object({
    title: string().required({title: ErrorCodes.emptyValue}),
    image: string().required({image: ErrorCodes.emptyValue}),
    shortKey: string().required({shortKey: ErrorCodes.emptyValue}),
    locale: string().required({locale: ErrorCodes.emptyValue}),
    statusId: number().required({statusId: ErrorCodes.emptyValue}),
})

export default {
    get: object({
        params: object({
            _id: string(),
        }),
    }),
    post: object({
        body: postBody
    }),
    put: object({
        params: object({
            _id: string().required({_id: ErrorCodes.emptyValue}),
        }),
        body: postBody
    })
};