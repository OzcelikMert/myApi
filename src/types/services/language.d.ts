import mongoose from "mongoose";

export interface SelectLanguageParamDocument {
    id?: mongoose.Types.ObjectId
}

export type InsertLanguageDocument = {} & LanguageDocument

export interface LanguageDocument {
    _id: mongoose.Types.ObjectId
    title: string
    image: string
    shortKey: string
    statusId: number
}