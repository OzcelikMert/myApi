import { object, string, number, boolean, array } from "yup";
import {ErrorCodes} from "../library/api";

const postBody = object({
    statusId: number().required({statusId: ErrorCodes.emptyValue}),
    termId: array(string().required({termId: ErrorCodes.incorrectData})),
    dateStart: string().required({dateStart: ErrorCodes.emptyValue}),
    order: number().required({order: ErrorCodes.emptyValue}),
    isFixed: number().is([1, 0], {isFixed: ErrorCodes.incorrectData}).required({isFixed: ErrorCodes.emptyValue}),
    contents: object({
        langId: string().required({langId: ErrorCodes.emptyValue}),
        title: string().required({title: ErrorCodes.emptyValue}),
        seoContent: string(),
        image: string(),
        seoTitle: string(),
        url: string(),
        content: string(),
        shortContent: string(),
    }).required({contents: ErrorCodes.emptyValue}),
    themeGroups: (array(object({
        elementId: string().required({elementId: ErrorCodes.emptyValue}),
        langKey: string().required({langKey: ErrorCodes.emptyValue}),
        types: (array(object({
            elementId: string().required({elementId: ErrorCodes.emptyValue}),
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
            langKey: string().required({langKey: ErrorCodes.emptyValue}),
            contents: object({
                langId: string().required({langId: ErrorCodes.emptyValue}),
                content: string().required({content: ErrorCodes.emptyValue})
            }).required({contents: ErrorCodes.emptyValue})
        }))).required({types: ErrorCodes.emptyValue})
    }))).default(undefined)
})

export default {
    getGeneral: object({
        query: object({
            langId: string().required({langId: ErrorCodes.emptyValue}),
            typeId: array(number().required({typeId: ErrorCodes.incorrectData})),
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
            statusId: number(),
            maxCount: number()
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