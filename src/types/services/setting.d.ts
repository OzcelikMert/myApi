import mongoose from "mongoose";
import {StatusId} from "../../constants/status";

export type SelectSettingParamDocument = {
    langId?: string
    getContactFormPasswords?: boolean
    onlyDefaultLanguageId?: boolean
}

export type UpdateSettingGeneralParamDocument = {} & Omit<InsertSettingParamDocument, "seoContents"|"contactForms"|"staticLanguages">

export type UpdateSettingSEOParamDocument = {
    seoContents?: SettingSeoContentDocument
}

export type UpdateSettingContactFormParamDocument = {
    contactForms: SettingContactFormDocument[]
}

export type UpdateSettingStaticLanguageParamDocument = {
    staticLanguages?: (Omit<SettingStaticLanguageDocument, "contents"> & { contents: SettingStaticLanguageContentDocument})[]
}

export type InsertSettingParamDocument = {
    seoContents?: SettingSeoContentDocument
    staticLanguages?: (Omit<SettingStaticLanguageDocument, "contents"> & { contents: SettingStaticLanguageContentDocument})[]
} & Omit<SettingDocument, "_id" | "seoContents" | "staticLanguages">

export type SelectSettingResultDocument = {
    seoContents?: SettingSeoContentDocument | SettingSeoContentDocument[]
    staticLanguages?: (Omit<SettingStaticLanguageDocument, "contents"> & { contents?: SettingStaticLanguageContentDocument | SettingStaticLanguageContentDocument[] })[]
} & Omit<SettingDocument, "seoContents" | "staticLanguages">

export interface SettingStaticLanguageContentDocument {
    _id?: mongoose.Types.ObjectId | string
    langId: mongoose.Types.ObjectId | string
    content?: string,
}

export interface SettingStaticLanguageDocument {
    _id?: mongoose.Types.ObjectId | string
    langKey: string,
    contents: SettingStaticLanguageContentDocument[]
}

export interface SettingSeoContentDocument {
    _id?: mongoose.Types.ObjectId | string
    langId: mongoose.Types.ObjectId | string
    title?: string,
    content?: string,
    tags?: string[]
}

export interface SettingContactFormDocument {
    _id?: mongoose.Types.ObjectId | string
    name: string
    key: string
    outGoingEmail: string
    email: string
    password?: string
    outGoingServer: string
    inComingServer: string
    port: number
}

export interface SettingContactDocument {
    email?: string,
    phone?: string,
    address?: string,
    addressMap?: string
    facebook?: string,
    instagram?: string,
    twitter?: string,
    linkedin?: string,
    google?: string,
}

export interface SettingDocument {
    _id: mongoose.Types.ObjectId | string
    defaultLangId: mongoose.Types.ObjectId | string
    icon?: string
    logo?: string
    logoTwo?: string
    head?: string
    script?: string
    seoContents: SettingSeoContentDocument[],
    contact?: SettingContactDocument
    contactForms?: SettingContactFormDocument[],
    staticLanguages: SettingStaticLanguageDocument[]
}
