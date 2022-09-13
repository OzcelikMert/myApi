import * as mongoose from "mongoose";
import languageModel from "./language.model";
import {SettingDocument, SettingSeoContentDocument} from "../types/services/setting";

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
        seoContents: {type: [schemaSEOContent], default: []}
    },
    {timestamps: true}
);

export default mongoose.model("settings", schema)