import mongoose from "mongoose";
import {PopulateAuthorIdDocument} from "./user";

export interface DeletePostTermParamDocument {
    _id: string | string[]
    typeId: number,
    postTypeId: number
}

export type UpdatePostTermStatusIdParamDocument = {
    _id?: string | string[],
    postTypeId?: number,
    typeId?: number
    statusId: number,
    lastAuthorId: string
}

export type UpdatePostTermParamDocument = {
    _id?: string,
} & Omit<InsertPostTermParamDocument, "authorId">

export type InsertPostTermParamDocument = {
    contents?: PostTermContentDocument
} & Omit<PostTermDocument, "_id"|"contents">

export interface SelectPostTermParamDocument {
    langId: string
    _id?: string
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
    alternates?: PostTermAlternateDocument[]
} & Omit<PostTermDocument, "contents">

export interface PostTermAlternateDocument {
    langId: mongoose.Types.ObjectId | string
    title?: string,
    url?: string
}

export interface PopulateTermsDocument {
    _id: mongoose.Types.ObjectId | string,
    typeId: number,
    contents: {
        langId: mongoose.Types.ObjectId | string,
        title: string,
    }[]
}

export interface PostTermContentDocument {
    langId: mongoose.Types.ObjectId | string
    image?: string,
    title?: string,
    shortContent?: string,
    url?: string,
    seoTitle?: string,
    seoContent?: string
}

export interface PostTermDocument {
    _id: mongoose.Types.ObjectId | string
    postTypeId?: number,
    typeId?: number,
    mainId?: mongoose.Types.ObjectId | string
    statusId: number,
    authorId: mongoose.Types.ObjectId | string
    lastAuthorId: mongoose.Types.ObjectId | string
    order: number,
    contents: PostTermContentDocument[]
    sitemap?: string
}