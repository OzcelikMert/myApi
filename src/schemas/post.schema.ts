import { object, string, number, boolean, array } from "yup";
import {ErrorCodes} from "../utils/ajax";

export default {
    getGeneral: object({
        query: object({
            langId: number().required({langId: ErrorCodes.emptyValue}),
            typeId: number() || array(number().required({typeId: ErrorCodes.incorrectData})),
            statusId: number(),
            getContents: boolean(),
            maxCount: number()
        }),
    }),
    get: object({
        params: object({
            postId: number().required({postId: ErrorCodes.emptyValue}),
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        query: object({
            langId: number().required({langId: ErrorCodes.emptyValue}),
            getContents: boolean(),
            statusId: number(),
            maxCount: number()
        })
    }),
    getWithType: object({
        params: object({
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        query: object({
            langId: number().required({langId: ErrorCodes.emptyValue}),
            getContents: boolean(),
            statusId: number(),
            maxCount: number()
        })
    }),
    post: object({
        body: object({
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
            langId: number().required({langId: ErrorCodes.emptyValue}),
            statusId: number().required({statusId: ErrorCodes.emptyValue}),
            termId: array(number().required({termId: ErrorCodes.incorrectData})).required({termId: ErrorCodes.emptyValue}),
            title: string().required({title: ErrorCodes.emptyValue}),
            dateStart: string().required({dateStart: ErrorCodes.emptyValue}),
            order: number().required({order: ErrorCodes.emptyValue}),
            image: string().required({image: ErrorCodes.emptyValue}),
            shortContent: string().required({shortContent: ErrorCodes.emptyValue}),
            content: string().required({content: ErrorCodes.emptyValue}),
            url: string().required({url: ErrorCodes.emptyValue}),
            seoTitle: string().required({seoTitle: ErrorCodes.emptyValue}),
            seoContent: string().required({seoContent: ErrorCodes.emptyValue}),
            isFixed: number().is([1, 0], {isFixed: ErrorCodes.incorrectData}).required({isFixed: ErrorCodes.emptyValue})
        })
    }),
    put: object({
        params: object({
            postId: number().required({postId: ErrorCodes.emptyValue}),
        }),
        body: object({
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
            langId: number().required({langId: ErrorCodes.emptyValue}),
            statusId: number().required({statusId: ErrorCodes.emptyValue}),
            termId: array(number().required({termId: ErrorCodes.incorrectData})).required({termId: ErrorCodes.emptyValue}),
            title: string().required({title: ErrorCodes.emptyValue}),
            dateStart: string().required({dateStart: ErrorCodes.emptyValue}),
            order: number().required({order: ErrorCodes.emptyValue}),
            image: string(),
            shortContent: string(),
            content: string(),
            url: string(),
            seoTitle: string(),
            seoContent: string(),
            isFixed: number().is([1, 0], {isFixed: ErrorCodes.incorrectData}).required({isFixed: ErrorCodes.emptyValue})
        })
    }),
    putStatus: object({
        params: object({
            typeId: number().required({typeId: ErrorCodes.emptyValue})
        }),
        body: object({
            postId: array(number().required({postId: ErrorCodes.incorrectData})).required({postId: ErrorCodes.emptyValue}),
            statusId: number().required({statusId: ErrorCodes.emptyValue})
        })
    }),
    delete: object({
        params: object({
            postId: number().required({postId: ErrorCodes.emptyValue}),
        })
    })
};