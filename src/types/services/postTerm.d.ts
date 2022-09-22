import mongoose from "mongoose";
import {PopulateAuthorIdDocument} from "./user";

export interface DeletePostTermParamDocument {
    termId: string | string[]
}

export interface UpdatePostTermParamDocument {
    termId: string | string[],
    lastAuthorId: string,
    postTypeId?: number,
    typeId?: number
    mainId?: string
    statusId?: number
    order?: number
    contents?: InsertPostTermParamDocument["contents"]
}

export interface InsertPostTermParamDocument {
    mainId?:string
    authorId: string,
    postTypeId: number,
    typeId: number,
    statusId: number,
    order: number,
    contents: Omit<PostTermContentDocument, "langId"> & {langId: string}
}

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
        }[]
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
}