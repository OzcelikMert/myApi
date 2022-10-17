import { object, string, number, boolean, array } from "yup";
import {ErrorCodes} from "../library/api";

const postBody = object({
    mainId: string(),
    statusId: number().required({statusId: ErrorCodes.emptyValue}),
    pageTypeId: number(),
    terms: array(string().required({termId: ErrorCodes.incorrectData})).default([]),
    dateStart: string().required({dateStart: ErrorCodes.emptyValue}),
    order: number().required({order: ErrorCodes.emptyValue}),
    isFixed: number().is([1, 0], {isFixed: ErrorCodes.incorrectData}),
    contents: object({
        langId: string().required({langId: ErrorCodes.emptyValue}),
        title: string().default(""),
        seoContent: string(),
        image: string(),
        seoTitle: string(),
        url: string(),
        content: string(),
        shortContent: string(),
        buttons: array(object({
            title: string().required({title: ErrorCodes.emptyValue}),
            url: string()
        })).default(undefined)
    }).required({contents: ErrorCodes.emptyValue}),
    components: array(string().required({components: ErrorCodes.incorrectData})).default(undefined),
})

export default {
    getGeneral: object({
        query: object({
            langId: string().required({langId: ErrorCodes.emptyValue}),
            typeId: array(number().required({typeId: ErrorCodes.incorrectData})),
            url: string(),
            pageTypeId: number(),
            statusId: number(),
            getContents: number().is([1, 0], {isFixed: ErrorCodes.incorrectData}),
            maxCount: number()
        }),
    }),
    get: object({
        params: object({
            postId: string(),
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        query: object({
            langId: string().required({langId: ErrorCodes.emptyValue}),
            getContents: number().is([1, 0], {isFixed: ErrorCodes.incorrectData}),
            url: string(),
            pageTypeId: number(),
            statusId: number(),
            maxCount: number(),
            isPrimary: boolean()
        })
    }),
    post: object({
        params: object({
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        body: postBody
    }),
    put: object({
        params: object({
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
            postId: string().required({postId: ErrorCodes.emptyValue}),
        }),
        body: postBody
    }),
    putStatus: object({
        params: object({
            typeId: number().required({typeId: ErrorCodes.emptyValue})
        }),
        body: object({
            postId: array(string().required({postId: ErrorCodes.incorrectData})).required({postId: ErrorCodes.emptyValue}),
            statusId: number().required({statusId: ErrorCodes.emptyValue})
        })
    }),
    delete: object({
        body: object({
            postId: array(string().required({postId: ErrorCodes.incorrectData})).required({postId: ErrorCodes.emptyValue}),
        })
    })
};