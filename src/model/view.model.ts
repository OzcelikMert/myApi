import * as mongoose from "mongoose";
import languageModel from "./language.model";

export interface SelectViewParamDocument {
    ip?: string
    langId?: mongoose.Types.ObjectId
    url?: string
    country?: string
    city?: string
    region?: string
    date?: string
    dateStart?: string
    dateEnd?: string
}

export interface InsertViewParamDocument {
    url: string,
    languageId: mongoose.Types.ObjectId,
    ip: string,
    country?: string,
    city?: string,
    region?: string
}

export type ViewTotalWithDocument = {
    total: number
    _id: string
}

export type ViewTotalWithCountryDocument = {
    total: number
    viewCountry: string
}

export interface ViewDocument {
    url: string,
    languageId: mongoose.Types.ObjectId,
    ip: string,
    country: string,
    city: string,
    region: string
}

const schema = new mongoose.Schema<ViewDocument>(
    {
        url: {type: String, required: true},
        languageId: {type: mongoose.Schema.Types.ObjectId, ref: languageModel},
        ip: {type: String, default: "", required: true},
        country: {type: String, default: ""},
        city: {type: String, default: ""},
        region: {type: String, default: ""}
    },
    {timestamps: true}
).index({languageId: 1}, {unique: true})

export default mongoose.model("views", schema)