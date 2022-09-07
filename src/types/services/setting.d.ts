import mongoose from "mongoose";
import {PopulateAuthorIdDocument} from "./user";

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
        tags?: string[]
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
    }
}

export type SelectSettingResultDocument = {} & SettingDocument

export interface SettingSeoContentDocument {
    langId: mongoose.Types.ObjectId
    title?: string,
    content?: string,
    tags?: string[]
}

export interface SettingDocument {
    _id: mongoose.Types.ObjectId
    defaultLangId: mongoose.Types.ObjectId
    icon?: string,
    logo?: string,
    seoContents: SettingSeoContentDocument[]
}
