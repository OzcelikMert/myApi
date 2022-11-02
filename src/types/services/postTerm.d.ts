import mongoose from "mongoose";
import {PopulateAuthorIdDocument} from "./user";

export interface DeletePostTermParamDocument {
    termId: string | string[]
}

export type UpdatePostTermStatusIdParamDocument = {
    termId: string | string[],
    postTypeId?: number,
    typeId: number
    statusId: number,
    lastAuthorId: string
}

export type UpdatePostTermParamDocument = {
    termId: string,
    lastAuthorId: string,
} & Omit<InsertPostTermParamDocument, "authorId">

export type InsertPostTermParamDocument = {
    mainId?:string
    authorId: string,
    contents: Omit<PostTermContentDocument, "langId"> & {langId: string}
} & Omit<PostTermDocument, "_id"|"mainId"|"lastAuthorId"|"authorId"|"views"|"contents">

export interface SelectPostTermParamDocument {
    langId: string
    termId?: string
    typeId?: number | number[],
    postTypeId?: number,
    url?: string
    statusId?: number,
    ignoreTermId?: string[],
    maxCount?: number
}

export type SelectPostTermResultDocument = {
    authorId: PopulateAuthorIdDocument,
    lastAuthorId: PopulateAuthorIdDocument,
    mainId?: {
        _id: mongoose.Types.ObjectId
        contents: {
            langId: mongoose.Types.ObjectId
            title: string,
            url: string,
        }
    },
    contents?: PostTermContentDocument | PostTermContentDocument[]
} & Omit<PostTermDocument, "contents">

export interface PopulateTermsDocument {
    _id: mongoose.Types.ObjectId,
    typeId: number,
    contents: {
        langId: mongoose.Types.ObjectId,
        title: string,
    }[]
}

export interface PostTermContentDocument {
    langId: mongoose.Types.ObjectId
    image?: string,
    title?: string,
    shortContent?: string,
    url?: string,
    seoTitle?: string,
    seoContent?: string
}

export interface PostTermDocument {
    _id: mongoose.Types.ObjectId
    postTypeId: number,
    typeId: number,
    mainId?: mongoose.Types.ObjectId
    statusId: number,
    authorId: mongoose.Types.ObjectId
    lastAuthorId: mongoose.Types.ObjectId
    order: number,
    views: number,
    contents: PostTermContentDocument[]
    siteMap?: string
}