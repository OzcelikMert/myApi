import {array, boolean, number, object, string} from "yup";
import {ErrorCodes} from "../library/api";

const postBody = object({
    title: string().required({title: ErrorCodes.emptyValue}),
    image: string().required({image: ErrorCodes.emptyValue}),
    shortKey: string().required({shortKey: ErrorCodes.emptyValue}),
    locale: string().required({locale: ErrorCodes.emptyValue}),
    statusId: number().required({statusId: ErrorCodes.emptyValue}),
    rank: number().default(0)
})

export default {
    getOne: object({
        query: object({
            _id: string(),
            shortKey: string(),
            locale: string(),
        }),
    }),
    getMany: object({
        query: object({
            _id: array(string().required({_id: ErrorCodes.incorrectData})).default(undefined),
            statusId: number()
        })
    }),
    post: object({
        body: postBody
    }),
    putOne: object({
        params: object({
            _id: string().required({_id: ErrorCodes.emptyValue}),
        }),
        body: postBody
    }),
    putOneRank: object({
        params: object({
            _id: string().required({_id: ErrorCodes.emptyValue}),
        }),
        body: object({
            rank: number().required({rank: ErrorCodes.emptyValue})
        })
    }),
};