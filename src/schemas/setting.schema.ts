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
            logoTwo: string(),
            head: string(),
            script: string(),
            seoContents: object({
                langId: string().required({langId: ErrorCodes.emptyValue}),
                title: string(),
                content: string(),
                tags: array(string().required({tags: ErrorCodes.incorrectData})).default([])
            }).default(undefined),
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
            contactForms: array(object({
                _id: string(),
                name: string().required({name: ErrorCodes.emptyValue}),
                key: string().required({key: ErrorCodes.emptyValue}),
                email: string().required({email: ErrorCodes.emptyValue}),
                password: string().required({password: ErrorCodes.emptyValue}),
                outGoingServer: string().required({outGoingServer: ErrorCodes.emptyValue}),
                inComingServer: string().required({inComingServer: ErrorCodes.emptyValue}),
                port: number().required({port: ErrorCodes.emptyValue})
            }).required({contactForms: ErrorCodes.incorrectData})).default(undefined)
        })
    })
};