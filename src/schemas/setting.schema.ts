import { object, number, boolean, string, array } from "yup";
import {ErrorCodes} from "../library/api";

export default {
    get: object({
        query: object({
            langId: string(),
            onlyDefaultLanguageId: boolean()
        }),
    }),
    putGeneral: object({
        body: object({
            defaultLangId: string(),
            icon: string(),
            logo: string(),
            logoTwo: string(),
            head: string(),
            script: string(),
            contact: object({
                email: string(),
                phone: string(),
                address: string(),
                addressMap: string(),
                facebook: string(),
                instagram: string(),
                twitter: string(),
                linkedin: string(),
                google: string(),
            }).default(undefined),
        })
    }),
    putSeo: object({
        body: object({
            seoContents: object({
                langId: string().required({langId: ErrorCodes.emptyValue}),
                title: string(),
                content: string(),
                tags: array(string().required({tags: ErrorCodes.incorrectData})).default([])
            }).required({seoContents: ErrorCodes.emptyValue}),
        })
    }),
    putContactForm: object({
        body: object({
            contactForms: array(object({
                _id: string(),
                name: string().required({name: ErrorCodes.emptyValue}),
                key: string().required({key: ErrorCodes.emptyValue}),
                outGoingEmail: string().required({outGoingEmail: ErrorCodes.emptyValue}),
                email: string().required({email: ErrorCodes.emptyValue}),
                password: string(),
                outGoingServer: string().required({outGoingServer: ErrorCodes.emptyValue}),
                inComingServer: string().required({inComingServer: ErrorCodes.emptyValue}),
                port: number().required({port: ErrorCodes.emptyValue})
            }).required({contactForms: ErrorCodes.incorrectData})).required({contactForms: ErrorCodes.emptyValue}),
        })
    }),
    putStaticLanguage: object({
        body: object({
            staticLanguages: array(object({
                _id: string(),
                langKey: string().required({langKey: ErrorCodes.emptyValue}),
                contents: object({
                    _id: string(),
                    langId: string().required({langId: ErrorCodes.emptyValue}),
                    content: string().default(""),
                })
            }).required({staticLanguages: ErrorCodes.incorrectData})).required({staticLanguages: ErrorCodes.emptyValue}),
        })
    }),
};