import {object, string, number, boolean, array, mixed} from "yup";
import {ErrorCodes} from "../library/api";

const postBody = object({
    mainId: string(),
    statusId: number().required({statusId: ErrorCodes.emptyValue}),
    rank: number().required({rank: ErrorCodes.emptyValue}),
    contents: object({
        langId: string().required({langId: ErrorCodes.emptyValue}),
        title: string().default(""),
        url: string(),
    }).required({contents: ErrorCodes.emptyValue}),
})

export default {
    getOne: object({
        query: object({
            _id: string(),
            langId: string(),
            statusId: number()
        })
    }),
    getMany: object({
        query: object({
            _id: array(string().required({_id: ErrorCodes.incorrectData})).default(undefined),
            langId: string(),
            statusId: number(),
            ignoreDefaultLanguage: boolean()
        })
    }),
    post: object({
        body: postBody
    }),
    putOne: object({
        params: object({
            _id: string().required({_id: ErrorCodes.emptyValue}),
        }),
        body: postBody
    }),
    putManyStatus: object({
        body: object({
            _id: array(string().required({_id: ErrorCodes.incorrectData})).required({_id: ErrorCodes.emptyValue}),
            statusId: number().required({statusId: ErrorCodes.emptyValue})
        })
    }),
    putOneRank: object({
        params: object({
            _id: string().required({_id: ErrorCodes.emptyValue}),
        }),
        body: object({
            rank: number().required({rank: ErrorCodes.emptyValue})
        })
    }),
    deleteMany: object({
        body: object({
            _id: array(string().required({_id: ErrorCodes.incorrectData})).required({_id: ErrorCodes.emptyValue}),
        })
    })
};