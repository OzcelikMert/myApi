import mongoose from "mongoose";

export type InsertSettingParamDocument = {
    defaultLangId: mongoose.Types.ObjectId
    icon?: string,
    logo?: string,
    seoContents?: SettingSeoContentDocument
}

export type UpdateSettingParamDocument = {} & InsertSettingParamDocument

export interface SettingSeoContentDocument {
    langId: mongoose.Types.ObjectId
    title: string,
    content: string,
    tags: string[]
}

export interface SettingDocument {
    _id: mongoose.Types.ObjectId
    defaultLangId: mongoose.Types.ObjectId
    icon: string,
    logo: string,
    seoContents: SettingSeoContentDocument[]
}
