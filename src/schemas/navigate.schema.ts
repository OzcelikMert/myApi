import {object, string, number, boolean, array} from "yup";
import {ErrorCodes} from "../library/api";

const postBody = object({
    langId: string().required({langId: ErrorCodes.emptyValue}),
    statusId: number().required({statusId: ErrorCodes.emptyValue}),
    mainId: string(),
    order: number().required({order: ErrorCodes.emptyValue}),
    contents: object({
        title: string().required({title: ErrorCodes.emptyValue}),
        url: string(),
    }).required({contents: ErrorCodes.emptyValue})
})

export default {
    get: object({
        params: object({
            navigateId: string(),
        }),
        query: object({
            langId: string().required({langId: ErrorCodes.emptyValue}),
            statusId: number(),
            maxCount: number()
        })
    }),
    post: object({
        body: postBody
    }),
    put: object({
        params: object({
            navigateId: string().required({navigateId: ErrorCodes.emptyValue})
        }),
        body: postBody
    }),
    putStatus: object({
        body: object({
            navigateId: array(string().required({navigateId: ErrorCodes.incorrectData})).required({navigateId: ErrorCodes.emptyValue}),
            statusId: number().required({statusId: ErrorCodes.emptyValue})
        })
    }),
    delete: object({
        body: object({
            navigateId: array(string().required({navigateId: ErrorCodes.incorrectData})).required({navigateId: ErrorCodes.emptyValue}),
        })
    })
};