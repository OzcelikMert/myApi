import {LanguageDocument} from "../models/language";

export type LanguageUpdateOneRankParamDocument = {
    _id: string
    rank: number
}

export type LanguageUpdateOneParamDocument = {
    _id: string
} & LanguageAddParamDocument

export type LanguageAddParamDocument = {} & Omit<LanguageDocument, "_id">

export interface LanguageGetManyParamDocument {
    _id?: string[]
    statusId?: number
}

export interface LanguageGetOneParamDocument {
    _id: string
}

export type LanguageGetResultDocument = {} & LanguageDocument