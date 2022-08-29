import * as mongoose from "mongoose";
import languageModel from "./language.model";

export type InsertSettingParamDocument = {
    defaultLangId: mongoose.Types.ObjectId,
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
    defaultLangId: mongoose.Types.ObjectId
    icon: string,
    logo: string,
    seoContents: SettingSeoContentDocument[]
}


const schemaSEOContent = new mongoose.Schema<SettingSeoContentDocument>(
    {
        langId: {type: mongoose.Schema.Types.ObjectId, ref: languageModel, required: true},
        title: {type: String},
        content: {type: String},
        tags: {type: [String], default: []}
    },
    {timestamps: true}
).index({langId: 1}, {unique: true});

const schema = new mongoose.Schema<SettingDocument>(
    {
        defaultLangId: {type: mongoose.Schema.Types.ObjectId, ref: languageModel},
        icon: {type: String, default: ""},
        logo: {type: String, default: ""},
        seoContents: {type: [schemaSEOContent], default: []}
    },
    {timestamps: true}
);

export default mongoose.model("settings", schema)