import mongoose from "mongoose";

export interface SelectLanguageParamDocument {
    _id?: string
}

export type UpdateLanguageParamDocument = {
    _id: string
} & InsertLanguageParamDocument

export type InsertLanguageParamDocument = {} & Omit<LanguageDocument, "_id">

export type SelectLanguageResultDocument = {} & LanguageDocument

export interface LanguageDocument {
    _id?: mongoose.Types.ObjectId | string
    title: string
    image: string
    shortKey: string
    locale: string
    statusId: number
}