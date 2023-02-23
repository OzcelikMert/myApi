import {object, string, number, array, boolean} from "yup";
import {ErrorCodes} from "../library/api";

const postBody = object({
    mainId: string(),
    statusId: number().required({statusId: ErrorCodes.emptyValue}),
    rank: number().required({rank: ErrorCodes.emptyValue}),
    contents: object({
        langId: string().required({langId: ErrorCodes.emptyValue}),
        title: string().required({title: ErrorCodes.emptyValue}),
        image: string(),
        url: string(),
        seoContent: string(),
    }).required({contents: ErrorCodes.emptyValue})
})

export default {
    get: object({
        params: object({
            _id: string(),
            postTypeId: number().required({typeId: ErrorCodes.emptyValue}),
            typeId: number(),
        }),
        query: object({
            withPostCount: boolean().default(false),
            langId: string(),
            statusId: number(),
            count: number(),
            ignoreDefaultLanguage: boolean()
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
            _id: string().required({termId: ErrorCodes.emptyValue}),
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
            _id: array(string().required({termId: ErrorCodes.incorrectData})).required({termId: ErrorCodes.emptyValue}),
            statusId: number().required({statusId: ErrorCodes.emptyValue})
        })
    }),
    putRank: object({
        params: object({
            postTypeId: number().required({typeId: ErrorCodes.emptyValue}),
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        body: object({
            _id: array(string().required({termId: ErrorCodes.incorrectData})).required({termId: ErrorCodes.emptyValue}),
            rank: number().required({rank: ErrorCodes.emptyValue})
        })
    }),
    delete: object({
        params: object({
            postTypeId: number().required({typeId: ErrorCodes.emptyValue}),
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        body: object({
            _id: array(string().required({termId: ErrorCodes.incorrectData})).required({termId: ErrorCodes.emptyValue}),
        })
    })
};