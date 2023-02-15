import {object, string, number, boolean, array, mixed, SchemaOf} from "yup";
import {ErrorCodes} from "../library/api";

const postBody = object({
    mainId: string(),
    statusId: number().required({statusId: ErrorCodes.emptyValue}),
    order: number().required({order: ErrorCodes.emptyValue}),
    contents: object({
        langId: string().required({langId: ErrorCodes.emptyValue}),
        title: string().default(""),
        url: string(),
    }).required({contents: ErrorCodes.emptyValue}),
})

export default {
    get: object({
        params: object({
            _id: string(),
        }),
        query: object({
            langId: string(),
            url: string(),
            statusId: number(),
            ignoreDefaultLanguage: boolean()
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
    putStatus: object({
        body: object({
            _id: array(string().required({_id: ErrorCodes.incorrectData})).required({_id: ErrorCodes.emptyValue}),
            statusId: number().required({statusId: ErrorCodes.emptyValue})
        })
    }),
    delete: object({
        body: object({
            _id: array(string().required({_id: ErrorCodes.incorrectData})).required({_id: ErrorCodes.emptyValue}),
        })
    })
};