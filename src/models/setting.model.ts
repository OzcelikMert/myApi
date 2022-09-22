import * as mongoose from "mongoose";
import languageModel from "./language.model";
import {SettingContactDocument, SettingDocument, SettingSeoContentDocument} from "../types/services/setting";

const schemaContact = new mongoose.Schema<SettingContactDocument>(
    {
        email: {type: String},
        phone: {type: String},
        address: {type: String},
        addressMap: {type: String},
        facebook: {type: String},
        instagram: {type: String},
        twitter: {type: String},
        linkedin: {type: String},
        google: {type: String}
    }
);

const schemaSEOContent = new mongoose.Schema<SettingSeoContentDocument>(
    {
        langId: {type: mongoose.Schema.Types.ObjectId, ref: languageModel, required: true},
        title: {type: String, default: ""},
        content: {type: String, default: ""},
        tags: {type: [String], default: []}
    },
    {timestamps: true}
).index({langId: 1});

const schema = new mongoose.Schema<SettingDocument>(
    {
        defaultLangId: {type: mongoose.Schema.Types.ObjectId, ref: languageModel, required: true},
        icon: {type: String, default: ""},
        logo: {type: String, default: ""},
        seoContents: {type: [schemaSEOContent], default: []},
        contact: {type: schemaContact}
    },
    {timestamps: true}
);

export default mongoose.model<SettingDocument>("settings", schema)