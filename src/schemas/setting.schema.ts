import { object, number, boolean, string, array } from "yup";
import {ErrorCodes} from "../library/api";

export default {
    get: object({
        query: object({
            langId: string(),
        }),
    }),
    put: object({
        body: object({
            defaultLangId: string(),
            icon: string(),
            logo: string(),
            seoContents: object({
                langId: string().required({langId: ErrorCodes.emptyValue}),
                title: string(),
                content: string(),
                tags: array(string().required({tags: ErrorCodes.incorrectData}))
            }).default(undefined)
        })
    })
};