import { object, string, number, boolean, array } from "yup";
import {ErrorCodes} from "../library/api";

const postBody = object({
    elementId: string().required({elementId: ErrorCodes.emptyValue}),
    langKey: string().required({langKey: ErrorCodes.emptyValue}),
    order: number().required({order: ErrorCodes.emptyValue}),
    types: (array(object({
        _id: string(),
        elementId: string().required({elementId: ErrorCodes.emptyValue}),
        typeId: number().required({typeId: ErrorCodes.emptyValue}),
        langKey: string().required({langKey: ErrorCodes.emptyValue}),
        order: number().required({order: ErrorCodes.emptyValue}),
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
    get: object({
        params: object({
            _id: string()
        }),
        query: object({
            elementId: string(),
            langId: string(),
            getContents: number().is([1, 0], {getContents: ErrorCodes.incorrectData}),
        })
    }),
    post: object({
        body: postBody
    }),
    put: object({
        params: object({
            _id: string().required({_id: ErrorCodes.emptyValue}),
        }),
        body: postBody
    }),
    delete: object({
        body: object({
            _id: array(string().required({_id: ErrorCodes.incorrectData})).required({_id: ErrorCodes.emptyValue}),
        })
    })
};