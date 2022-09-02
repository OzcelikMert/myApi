import { object, string, number, boolean, array } from "yup";
import {ErrorCodes} from "../utils/service";

const postBody = object({
    typeId: number().required({typeId: ErrorCodes.emptyValue}),
    langId: string().required({langId: ErrorCodes.emptyValue}),
    statusId: number().required({statusId: ErrorCodes.emptyValue}),
    termId: array(string().required({termId: ErrorCodes.incorrectData})),
    dateStart: string().required({dateStart: ErrorCodes.emptyValue}),
    order: number().required({order: ErrorCodes.emptyValue}),
    isFixed: number().is([1, 0], {isFixed: ErrorCodes.incorrectData}).required({isFixed: ErrorCodes.emptyValue}),
    contents: object({
        title: string().required({title: ErrorCodes.emptyValue}),
        seoContent: string(),
        image: string(),
        seoTitle: string(),
        url: string(),
        content: string(),
        shortContent: string(),
    }).required({contents: ErrorCodes.emptyValue})
})

export default {
    getGeneral: {
        query: object({
            langId: string().required({langId: ErrorCodes.emptyValue}),
            typeId: array(number().required({typeId: ErrorCodes.incorrectData})),
            statusId: number(),
            getContents: boolean(),
            maxCount: number()
        }),
    },
    get: {
        params: object({
            postId: string().required({postId: ErrorCodes.emptyValue}),
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        query: object({
            langId: string().required({langId: ErrorCodes.emptyValue}),
            getContents: boolean(),
            statusId: number(),
            maxCount: number()
        })
    },
    getWithType: {
        params: object({
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        query: object({
            langId: string().required({langId: ErrorCodes.emptyValue}),
            getContents: boolean(),
            statusId: number(),
            maxCount: number()
        })
    },
    post: {
        body: postBody
    },
    put: {
        params: object({
            postId: string().required({postId: ErrorCodes.emptyValue}),
        }),
        body: postBody
    },
    putStatus: {
        params: object({
            typeId: number().required({typeId: ErrorCodes.emptyValue})
        }),
        body: object({
            postId: array(string().required({postId: ErrorCodes.incorrectData})).required({postId: ErrorCodes.emptyValue}),
            statusId: number().required({statusId: ErrorCodes.emptyValue})
        })
    },
    delete: {
        body: object({
            postId: array(string().required({postId: ErrorCodes.incorrectData})).required({postId: ErrorCodes.emptyValue}),
        })
    }
};