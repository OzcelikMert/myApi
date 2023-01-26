import mongoose from "mongoose";

export interface DeleteViewParamDocument {
    dateEnd: Date
}

export interface SelectViewParamDocument {
    ip?: string
    langId?: string
    url?: string
    country?: string
    city?: string
    region?: string
    dateStart?: Date
    dateEnd?: Date
}

export interface InsertViewParamDocument {
    url: string,
    langId: string
    ip: string,
    country?: string,
    city?: string,
    region?: string
}

export type SelectViewResultDocument = {} & ViewDocument

export interface SelectTotalViewResultDocument {
    total: number
}

export type SelectTotalWithViewResultDocument = {
    total: number
    _id: string
}

export interface ViewDocument {
    _id: mongoose.Types.ObjectId | string
    url: string,
    langId: mongoose.Types.ObjectId | string
    ip: string,
    country: string,
    city: string,
    region: string
}