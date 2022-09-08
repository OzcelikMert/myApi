import mongoose from "mongoose";
import {PopulateAuthorIdDocument} from "./user";

export interface DeletePostTermParamDocument {
    termId: mongoose.Types.ObjectId | mongoose.Types.ObjectId[]
}

export interface UpdatePostTermParamDocument {
    termId: mongoose.Types.ObjectId | mongoose.Types.ObjectId[],
    lastAuthorId: mongoose.Types.ObjectId,
    postTypeId?: number,
    typeId?: number
    mainId?: mongoose.Types.ObjectId
    statusId?: number
    order?: number
    isFixed?: boolean
    contents?: InsertPostTermParamDocument["contents"]
}

export interface InsertPostTermParamDocument {
    mainId?: mongoose.Types.ObjectId
    authorId: mongoose.Types.ObjectId,
    postTypeId: number,
    typeId: number,
    statusId: number,
    order: number,
    isFixed: boolean,
    contents: PostTermContentDocument
}

export interface SelectPostTermParamDocument {
    langId: mongoose.Types.ObjectId
    termId?: mongoose.Types.ObjectId
    typeId?: number | number[],
    postTypeId?: number,
    url?: string
    statusId?: number,
    ignoreTermId?: mongoose.Types.ObjectId[],
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
    isFixed: boolean,
    contents: PostTermContentDocument[]
}