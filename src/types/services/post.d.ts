import mongoose from "mongoose";
import {PopulateAuthorIdDocument} from "./user";
import {PopulateTermsDocument} from "./postTerm";

export interface DeletePostParamDocument {
    postId: mongoose.Types.ObjectId | mongoose.Types.ObjectId[]
}

export interface UpdatePostParamDocument {
    postId: mongoose.Types.ObjectId | mongoose.Types.ObjectId[],
    typeId?: number,
    statusId?: number,
    order?: number,
    lastAuthorId: mongoose.Types.ObjectId
    dateStart?: Date,
    isFixed?: boolean,
    contents?: InsertPostParamDocument["contents"]
}

export interface InsertPostParamDocument {
    typeId: number,
    statusId: number,
    order: number,
    authorId: mongoose.Types.ObjectId
    dateStart: Date,
    isFixed: boolean,
    contents: PostContentDocument
}

export interface SelectPostParamDocument {
    postId?: mongoose.Types.ObjectId
    typeId?: number | number[],
    langId: mongoose.Types.ObjectId
    url?: string
    statusId?: number,
    getContents?: boolean,
    maxCount?: number,
    ignorePostId?: mongoose.Types.ObjectId[]
}

export type SelectPostResultDocument = {
    authorId: PopulateAuthorIdDocument,
    lastAuthorId: PopulateAuthorIdDocument,
    terms: PopulateTermsDocument[]
} & PostDocument

export interface PostContentDocument {
    langId: mongoose.Types.ObjectId
    image?: string,
    title?: string,
    content?: string,
    shortContent?: string,
    url?: string,
    seoTitle?: string,
    seoContent?: string
}

export interface PostDocument {
    _id: mongoose.Types.ObjectId
    typeId: number,
    statusId: number,
    authorId: mongoose.Types.ObjectId | PopulateAuthorIdDocument
    lastAuthorId: mongoose.Types.ObjectId | PopulateAuthorIdDocument
    dateStart: Date,
    order: number,
    views: number,
    isFixed: boolean,
    terms: mongoose.Types.ObjectId[] | PopulateTermsDocument[]
    contents: PostContentDocument[]
}