import mongoose from "mongoose";

export type SelectSettingParamDocument = {
    langId?: mongoose.Types.ObjectId
}

export type InsertSettingParamDocument = {
    defaultLangId: mongoose.Types.ObjectId
    icon?: string,
    logo?: string,
    seoContents?: {
        langId: mongoose.Types.ObjectId
        title?: string,
        content?: string,
        tags?: string[],
    },
    contact?: {
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
}

export type UpdateSettingParamDocument = {
    defaultLangId?: mongoose.Types.ObjectId
    icon?: string,
    logo?: string,
    seoContents?: {
        langId: mongoose.Types.ObjectId
        title?: string,
        content?: string,
        tags?: string[]
    },
    contact?: {
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
}

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
    icon?: string,
    logo?: string,
    seoContents: SettingSeoContentDocument[],
    contact?: SettingContactDocument
}
