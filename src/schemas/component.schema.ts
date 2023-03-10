import {object, string, number, array, boolean} from "yup";
import {ErrorCodes} from "../library/api";

const postBody = object({
    elementId: string().required({elementId: ErrorCodes.emptyValue}),
    langKey: string().required({langKey: ErrorCodes.emptyValue}),
    types: (array(object({
        _id: string(),
        elementId: string().required({elementId: ErrorCodes.emptyValue}),
        typeId: number().required({typeId: ErrorCodes.emptyValue}),
        langKey: string().required({langKey: ErrorCodes.emptyValue}),
        rank: number().required({rank: ErrorCodes.emptyValue}),
        contents: object({
            _id: string(),
            url: string(),
            comment: string(),
            langId: string().required({langId: ErrorCodes.emptyValue}),
            content: string()
        }).required({contents: ErrorCodes.emptyValue})
    }))).default([])
})

export default {
    getOne: object({
        query: object({
            _id: string(),
            elementId: string(),
            langId: string(),
        })
    }),
    getMany: object({
        query: object({
            _id: array(string().required({_id: ErrorCodes.incorrectData})).default(undefined),
            elementId: array(string().required({elementId: ErrorCodes.incorrectData})).default(undefined),
            langId: string()
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
    deleteMany: object({
        body: object({
            _id: array(string().required({_id: ErrorCodes.incorrectData})).required({_id: ErrorCodes.emptyValue}),
        })
    })
};