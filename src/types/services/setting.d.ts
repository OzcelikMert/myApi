import mongoose from "mongoose";

export type SelectSettingParamDocument = {
    langId?: string
}

export type InsertSettingParamDocument = {
    defaultLangId: string
    seoContents?: Omit<SettingSeoContentDocument, "langId"> & {langId: string}
} & Omit<SettingDocument,  "_id"|"defaultLangId"|"seoContents">

export type UpdateSettingParamDocument = {
    defaultLangId?: string
} & Omit<InsertSettingParamDocument, "defaultLangId">

export type SelectSettingResultDocument = {
    seoContents?: SettingSeoContentDocument | SettingSeoContentDocument[]
} & Omit<SettingDocument, "seoContents">

export interface SettingSeoContentDocument {
    langId: mongoose.Types.ObjectId
    title?: string,
    content?: string,
    tags?: string[]
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
    _id: mongoose.Types.ObjectId
    defaultLangId: mongoose.Types.ObjectId
    icon?: string
    logo?: string
    logoTwo?: string
    head?: string
    script?: string
    seoContents: SettingSeoContentDocument[],
    contact?: SettingContactDocument
}
