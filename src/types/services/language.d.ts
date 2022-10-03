import mongoose from "mongoose";

export interface SelectLanguageParamDocument {
    id?: string
}

export type InsertLanguageDocument = {
} & Omit<LanguageDocument, "_id">

export type SelectLanguageResultDocument = {} & LanguageDocument

export interface LanguageDocument {
    _id: mongoose.Types.ObjectId
    title: string
    image: string
    shortKey: string
    locale: string
    statusId: number
}