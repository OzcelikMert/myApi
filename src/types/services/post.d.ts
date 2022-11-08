import mongoose from "mongoose";
import {PopulateAuthorIdDocument} from "./user";
import {PopulateTermsDocument} from "./postTerm";
import {ComponentDocument} from "./component";

export interface DeletePostParamDocument {
    postId: string | string[]
    typeId: number
}

export type UpdatePostStatusIdParamDocument = {
    postId: string | string[],
    typeId: number
    statusId: number,
    lastAuthorId: string
}

export type UpdatePostViewParamDocument = {
    postId: string,
    typeId: number
    langId: string
}

export type UpdatePostParamDocument = {
    postId: string,
    lastAuthorId: string,
} & Omit<InsertPostParamDocument, "authorId">

export type InsertPostParamDocument = {
    mainId?:string
    authorId: string
    terms: string[]
    contents: Omit<PostContentDocument, "_id"|"langId"> & {langId: string}
    components?: string[]
} & Omit<PostDocument, "_id"|"components"|"mainId"|"lastAuthorId"|"authorId"|"views"|"contents"|"terms">

export interface SelectPostParamDocument {
    postId?: string
    typeId?: number | number[],
    pageTypeId?: number
    langId?: string
    url?: string
    statusId?: number,
    getContents?: boolean,
    maxCount?: number,
    ignorePostId?: string[]
}

export type SelectPostResultDocument = {
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
    views?: number,
    terms: PopulateTermsDocument[]
    contents?: PostContentDocument | PostContentDocument[]
    components?: ComponentDocument[]
} & Omit<PostDocument, "contents"|"themeGroups"|"terms"|"components">

export interface PostContentButtonDocument {
    _id?: mongoose.Types.ObjectId
    title: string,
    url?: string
}

export interface PostContentDocument {
    _id?: mongoose.Types.ObjectId
    langId: mongoose.Types.ObjectId
    image?: string,
    title?: string,
    content?: string,
    shortContent?: string,
    url?: string,
    seoTitle?: string,
    seoContent?: string,
    views?: number,
    buttons?: PostContentButtonDocument[]
}

export interface PostDocument {
    _id?: mongoose.Types.ObjectId
    typeId: number,
    statusId: number,
    pageTypeId?: number,
    mainId?: mongoose.Types.ObjectId
    authorId: mongoose.Types.ObjectId
    lastAuthorId: mongoose.Types.ObjectId
    dateStart: Date,
    order: number,
    isFixed?: boolean,
    terms: mongoose.Types.ObjectId[]
    contents: PostContentDocument[]
    components?: mongoose.Types.ObjectId[],
    sitemap?: string
}