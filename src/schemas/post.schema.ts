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
    siteMap: string().default(undefined),
    contents: object({
        langId: string().required({langId: ErrorCodes.emptyValue}),
        title: string().default(""),
        seoContent: string(),
        image: string(),
        icon: string(),
        seoTitle: string(),
        url: string(),
        content: string(),
        shortContent: string(),
        buttons: array(object({
            title: string().required({title: ErrorCodes.emptyValue}),
            url: string()
        })).default(undefined)
    }).required({contents: ErrorCodes.emptyValue}),
    components: array(string().required({components: ErrorCodes.incorrectData})).default([]),
})

export default {
    getGeneral: object({
        query: object({
            langId: string(),
            typeId: array(number().required({typeId: ErrorCodes.incorrectData})),
            url: string(),
            pageTypeId: number(),
            statusId: number(),
            getContents: number().is([1], {getContents: ErrorCodes.incorrectData}).default(undefined),
            maxCount: number()
        }),
    }),
    get: object({
        params: object({
            postId: string(),
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        query: object({
            langId: string(),
            getContents: number().is([1], {getContents: ErrorCodes.incorrectData}).default(undefined),
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
    putView: object({
        params: object({
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
            postId: string().required({postId: ErrorCodes.emptyValue}),
        }),
        body: object({
            url: string().default(""),
            langId: string().required({langId: ErrorCodes.emptyValue})
        })
    }),
    delete: object({
        params: object({
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        body: object({
            postId: array(string().required({postId: ErrorCodes.incorrectData})).required({postId: ErrorCodes.emptyValue}),
        })
    })
};