import { object, string, number, boolean, array } from "yup";
import {ErrorCodes} from "../utils/ajax";

export default {
    get: object({
        params: object({
            termId: number().required({termId: ErrorCodes.emptyValue}),
            postTypeId: number().required({typeId: ErrorCodes.emptyValue}),
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
            postTypeId: number().required({typeId: ErrorCodes.emptyValue}),
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
        params: object({
            postTypeId: number().required({typeId: ErrorCodes.emptyValue}),
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        body: object({
            langId: number().required({langId: ErrorCodes.emptyValue}),
            statusId: number().required({statusId: ErrorCodes.emptyValue}),
            mainId: number().required({mainId: ErrorCodes.emptyValue}),
            title: string().required({title: ErrorCodes.emptyValue}),
            order: number().required({order: ErrorCodes.emptyValue}),
            image: string().required({image: ErrorCodes.emptyValue}),
            content: string().required({content: ErrorCodes.emptyValue}),
            url: string().required({url: ErrorCodes.emptyValue}),
            seoTitle: string().required({seoTitle: ErrorCodes.emptyValue}),
            seoContent: string().required({seoContent: ErrorCodes.emptyValue}),
            isFixed: number().is([1, 0], {isFixed: ErrorCodes.incorrectData}).required({isFixed: ErrorCodes.emptyValue})
        })
    }),
    put: object({
        params: object({
            termId: number().required({termId: ErrorCodes.emptyValue}),
            postTypeId: number().required({typeId: ErrorCodes.emptyValue}),
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        body: object({
            langId: number().required({langId: ErrorCodes.emptyValue}),
            statusId: number().required({statusId: ErrorCodes.emptyValue}),
            mainId: number().required({mainId: ErrorCodes.emptyValue}),
            title: string().required({title: ErrorCodes.emptyValue}),
            order: number().required({order: ErrorCodes.emptyValue}),
            image: string(),
            content: string(),
            url: string(),
            seoTitle: string(),
            seoContent: string(),
            isFixed: number().is([1, 0], {isFixed: ErrorCodes.incorrectData}).required({isFixed: ErrorCodes.emptyValue})
        })
    }),
    putStatus: object({
        params: object({
            postTypeId: number().required({typeId: ErrorCodes.emptyValue}),
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        body: object({
            termId: array(number().required({termId: ErrorCodes.incorrectData})).required({termId: ErrorCodes.emptyValue}),
            statusId: number().required({statusId: ErrorCodes.emptyValue})
        })
    }),
    delete: object({
        params: object({
            termId: number().required({termId: ErrorCodes.emptyValue}),
        })
    })
};