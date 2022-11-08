import {object, string, number, boolean, array} from "yup";
import {ErrorCodes} from "../library/api";

const postBody = object({
    mainId: string(),
    statusId: number().required({statusId: ErrorCodes.emptyValue}),
    order: number().required({order: ErrorCodes.emptyValue}),
    contents: object({
        langId: string().required({langId: ErrorCodes.emptyValue}),
        title: string().required({title: ErrorCodes.emptyValue}),
        image: string(),
        url: string(),
        seoTitle: string(),
        seoContent: string(),
    }).required({contents: ErrorCodes.emptyValue})
})

export default {
    get: object({
        params: object({
            termId: string(),
            postTypeId: number().required({typeId: ErrorCodes.emptyValue}),
            typeId: number(),
        }),
        query: object({
            langId: string().required({langId: ErrorCodes.emptyValue}),
            statusId: number(),
            maxCount: number()
        })
    }),
    post: object({
        params: object({
            postTypeId: number().required({typeId: ErrorCodes.emptyValue}),
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        body: postBody
    }),
    put: object({
        params: object({
            termId: string().required({termId: ErrorCodes.emptyValue}),
            postTypeId: number().required({typeId: ErrorCodes.emptyValue}),
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        body: postBody
    }),
    putStatus: object({
        params: object({
            postTypeId: number().required({typeId: ErrorCodes.emptyValue}),
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        body: object({
            termId: array(string().required({termId: ErrorCodes.incorrectData})).required({termId: ErrorCodes.emptyValue}),
            statusId: number().required({statusId: ErrorCodes.emptyValue})
        })
    }),
    delete: object({
        params: object({
            postTypeId: number().required({typeId: ErrorCodes.emptyValue}),
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        body: object({
            termId: array(string().required({termId: ErrorCodes.incorrectData})).required({termId: ErrorCodes.emptyValue}),
        })
    })
};