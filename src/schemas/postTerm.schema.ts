import {object, string, number, array, boolean} from "yup";
import {ErrorCodes} from "../library/api";

const postBody = object({
    mainId: string(),
    statusId: number().required({statusId: ErrorCodes.emptyValue}),
    rank: number().default(0),
    contents: object({
        langId: string().required({langId: ErrorCodes.emptyValue}),
        title: string().min(3, {title: ErrorCodes.incorrectData}).required({title: ErrorCodes.emptyValue}),
        image: string(),
        url: string(),
    }).required({contents: ErrorCodes.emptyValue})
})

export default {
    getOne: object({
        params: object({
            postTypeId: number().required({postTypeId: ErrorCodes.emptyValue}),
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        query: object({
            _id: string(),
            url: string(),
            langId: string(),
            statusId: number(),
        })
    }),
    getMany: object({
        params: object({
            postTypeId: number().required({postTypeId: ErrorCodes.emptyValue}),
        }),
        query: object({
            _id: array(string().required({_id: ErrorCodes.incorrectData})).default(undefined),
            typeId: array(number().required({typeId: ErrorCodes.incorrectData})).default(undefined),
            withPostCount: boolean().default(false),
            langId: string(),
            statusId: number(),
            title: string(),
            count: number(),
            page: number(),
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
    putOne: object({
        params: object({
            _id: string().required({_id: ErrorCodes.emptyValue}),
            postTypeId: number().required({postTypeId: ErrorCodes.emptyValue}),
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        body: postBody
    }),
    putManyStatus: object({
        params: object({
            postTypeId: number().required({postTypeId: ErrorCodes.emptyValue}),
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        body: object({
            _id: array(string().required({_id: ErrorCodes.incorrectData})).required({_id: ErrorCodes.emptyValue}),
            statusId: number().required({statusId: ErrorCodes.emptyValue})
        })
    }),
    putOneRank: object({
        params: object({
            _id: string().required({_id: ErrorCodes.emptyValue}),
            postTypeId: number().required({postTypeId: ErrorCodes.emptyValue}),
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        body: object({
            rank: number().required({rank: ErrorCodes.emptyValue})
        })
    }),
    deleteMany: object({
        params: object({
            postTypeId: number().required({postTypeId: ErrorCodes.emptyValue}),
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        body: object({
            _id: array(string().required({_id: ErrorCodes.incorrectData})).required({_id: ErrorCodes.emptyValue}),
        })
    })
};