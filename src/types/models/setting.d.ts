import mongoose from "mongoose";

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
    contactForms: SettingContactFormDocument[],
    staticLanguages: SettingStaticLanguageDocument[]
    socialMedia: SettingSocialMediaDocument[]
    eCommerce?: SettingECommerceDocument
}

export interface SettingECommerceDocument {
    currencyId: number
}

export interface SettingContactDocument {
    email?: string,
    phone?: string,
    address?: string,
    addressMap?: string
}

export interface SettingSocialMediaDocument {
    _id?: mongoose.Types.ObjectId | string
    elementId: string
    title: string
    url: string
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

export interface SettingSeoContentDocument {
    _id?: mongoose.Types.ObjectId | string
    langId: mongoose.Types.ObjectId | string
    title?: string,
    content?: string,
    tags?: string[]
}

export interface SettingStaticLanguageDocument {
    _id?: mongoose.Types.ObjectId | string
    langKey: string,
    title: string
    contents: SettingStaticLanguageContentDocument[]
}

export interface SettingStaticLanguageContentDocument {
    _id?: mongoose.Types.ObjectId | string
    langId: mongoose.Types.ObjectId | string
    content?: string,
}