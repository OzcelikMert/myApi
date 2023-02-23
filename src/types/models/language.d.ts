import mongoose from "mongoose";

export interface LanguageDocument {
    _id?: mongoose.Types.ObjectId | string
    title: string
    image: string
    shortKey: string
    locale: string
    statusId: number
    rank: number
}