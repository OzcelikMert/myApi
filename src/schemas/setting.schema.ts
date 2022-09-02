import { object, number, boolean, string, array } from "yup";
import {ErrorCodes} from "../utils/service";

export default {
    get: {
        query: object({
            langId: string().required({langId: ErrorCodes.emptyValue}),
        }),
    },
    put: {
        body: object({
            defaultLangId: string(),
            icon: string(),
            logo: string(),
            langId: string().required({langId: ErrorCodes.emptyValue}),
            seoContents: object({
                title: string(),
                content: string(),
                tags: array(string().required({tags: ErrorCodes.incorrectData}))
            })
        })
    }
};