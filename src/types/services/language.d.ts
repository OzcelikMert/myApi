import mongoose from "mongoose";

export interface SelectLanguageParamDocument {
    id?: mongoose.Types.ObjectId,
}

export type InsertLanguageDocument = {} & LanguageDocument

export interface LanguageDocument {
    title: string,
    image: string,
    shortKey: string
}