import mongoose from "mongoose";

export interface DeleteViewParamDocument {
    dateEnd: Date
}

export interface SelectViewParamDocument {
    ip?: string
    langId?: mongoose.Types.ObjectId
    url?: string
    country?: string
    city?: string
    region?: string
    date?: Date
    dateStart?: Date
    dateEnd?: Date
}

export interface InsertViewParamDocument {
    url: string,
    languageId: mongoose.Types.ObjectId
    ip: string,
    country?: string,
    city?: string,
    region?: string
}

export interface ViewTotalDocument {
    total: number
}

export type ViewTotalWithDocument = {
    total: number
    _id: string
}

export interface ViewDocument {
    _id: mongoose.Types.ObjectId
    url: string,
    languageId: mongoose.Types.ObjectId
    ip: string,
    country: string,
    city: string,
    region: string
}