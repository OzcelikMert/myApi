import {object, string, number, boolean, array} from "yup";
import {ErrorCodes} from "../utils/service";

const postBody = object({
    langId: string().required({langId: ErrorCodes.emptyValue}),
    mainId: string(),
    statusId: number().required({statusId: ErrorCodes.emptyValue}),
    order: number().required({order: ErrorCodes.emptyValue}),
    isFixed: number().is([1, 0], {isFixed: ErrorCodes.incorrectData}).required({isFixed: ErrorCodes.emptyValue}),
    contents: object({
        title: string().required({title: ErrorCodes.emptyValue}),
        image: string(),
        url: string(),
        seoTitle: string(),
        seoContent: string(),
    }).required({contents: ErrorCodes.emptyValue})
})

export default {
    get: {
        params: object({
            termId: string().required({termId: ErrorCodes.emptyValue}),
            postTypeId: number().required({typeId: ErrorCodes.emptyValue}),
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        query: object({
            langId: string().required({langId: ErrorCodes.emptyValue}),
            statusId: number(),
            maxCount: number()
        })
    },
    getWithType: {
        params: object({
            postTypeId: number().required({typeId: ErrorCodes.emptyValue}),
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        query: object({
            langId: string().required({langId: ErrorCodes.emptyValue}),
            statusId: number(),
            maxCount: number()
        })
    },
    post: {
        params: object({
            postTypeId: number().required({typeId: ErrorCodes.emptyValue}),
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        body: postBody
    },
    put: {
        params: object({
            termId: string().required({termId: ErrorCodes.emptyValue}),
            postTypeId: number().required({typeId: ErrorCodes.emptyValue}),
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        body: postBody
    },
    putStatus: {
        params: object({
            postTypeId: number().required({typeId: ErrorCodes.emptyValue}),
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        body: object({
            termId: array(string().required({termId: ErrorCodes.incorrectData})).required({termId: ErrorCodes.emptyValue}),
            statusId: number().required({statusId: ErrorCodes.emptyValue})
        })
    },
    delete: {
        body: object({
            termId: array(string().required({termId: ErrorCodes.incorrectData})).required({termId: ErrorCodes.emptyValue}),
        })
    }
};