import mongoose from "mongoose";
import {StatusId} from "../../constants/status";

export type SelectSettingParamDocument = {
    langId?: string
    getContactFormPasswords?: boolean
}

export type InsertSettingParamDocument = {
    defaultLangId: string
    seoContents?: Omit<SettingSeoContentDocument, "langId"> & {langId: string}
    contactForms?: (Omit<SettingContactFormDocument, "_id"> & {_id?: string})[]
} & Omit<SettingDocument,  "_id"|"defaultLangId"|"seoContents"|"contactForms">

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

export interface SettingContactFormDocument {
    _id?: mongoose.Types.ObjectId
    name: string
    key: string
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
    _id: mongoose.Types.ObjectId
    defaultLangId: mongoose.Types.ObjectId
    icon?: string
    logo?: string
    logoTwo?: string
    head?: string
    script?: string
    seoContents: SettingSeoContentDocument[],
    contact?: SettingContactDocument
    contactForms?: SettingContactFormDocument[]
}
