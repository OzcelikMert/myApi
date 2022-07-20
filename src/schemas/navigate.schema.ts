import { object, string, number, boolean, array } from "yup";
import {ErrorCodes} from "../utils/ajax";

export default {
    get: object({
        query: object({
            langId: number().required({langId: ErrorCodes.emptyValue}),
            getContents: boolean(),
            statusId: number(),
            maxCount: number()
        })
    }),
    getWithId: object({
        params: object({
            navigateId: number().required({navigateId: ErrorCodes.emptyValue}),
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
            langId: number().required({langId: ErrorCodes.emptyValue}),
            statusId: number().required({statusId: ErrorCodes.emptyValue}),
            mainId: number().required({mainId: ErrorCodes.emptyValue}),
            title: string().required({title: ErrorCodes.emptyValue}),
            order: number().required({order: ErrorCodes.emptyValue}),
            url: string().required({url: ErrorCodes.emptyValue}),
        })
    }),
    put: object({
        params: object({
            navigateId: number().required({navigateId: ErrorCodes.emptyValue})
        }),
        body: object({
            langId: number().required({langId: ErrorCodes.emptyValue}),
            statusId: number().required({statusId: ErrorCodes.emptyValue}),
            mainId: number().required({mainId: ErrorCodes.emptyValue}),
            title: string().required({title: ErrorCodes.emptyValue}),
            order: number().required({order: ErrorCodes.emptyValue}),
            url: string().required({url: ErrorCodes.emptyValue}),
        })
    }),
    putStatus: object({
        body: object({
            navigateId: array(number().required({navigateId: ErrorCodes.incorrectData})).required({navigateId: ErrorCodes.emptyValue}),
            statusId: number().required({statusId: ErrorCodes.emptyValue})
        })
    }),
    delete: object({
        params: object({
            navigateId: number().required({navigateId: ErrorCodes.emptyValue}),
        })
    })
};