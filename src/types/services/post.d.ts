import mongoose from "mongoose";
import {PopulateAuthorIdDocument} from "./user";
import {PopulateTermsDocument} from "./postTerm";

export interface DeletePostParamDocument {
    postId: string | string[]
}

export type UpdatePostStatusIdParamDocument = {
    postId: string | string[],
    typeId: number
    statusId: number,
    lastAuthorId: string
}

export type UpdatePostParamDocument = {
    postId: string,
    lastAuthorId: string,
    themeGroups?: (Omit<PostThemeGroupDocument, "types"|"_id"> & {
        _id?: string,
        types: (Omit<PostThemeGroupTypeDocument, "contents"|"_id"> & {
            _id?: string,
            contents: Omit<PostThemeGroupTypeContentDocument, "_id"|"langId"> & {langId: string}
        })[]
    })[]
} & Omit<InsertPostParamDocument, "themeGroups"|"authorId">

export type InsertPostParamDocument = {
    typeId: number,
    statusId: number,
    authorId: string
    dateStart: Date,
    order: number,
    isFixed: boolean,
    terms: string[]
    contents: Omit<PostContentDocument, "_id"|"langId"> & {langId: string}
    themeGroups?: (Omit<PostThemeGroupDocument, "types"|"_id"> & {
        types: (Omit<PostThemeGroupTypeDocument, "contents"|"_id"> & {
            contents: Omit<PostThemeGroupTypeContentDocument, "_id"|"langId"> & {langId: string}
        })[]
    })[]
}

export interface SelectPostParamDocument {
    postId?: string
    typeId?: number | number[],
    langId: string
    url?: string
    statusId?: number,
    getContents?: boolean,
    maxCount?: number,
    ignorePostId?: string[]
}

export type SelectPostResultDocument = {
    authorId: PopulateAuthorIdDocument,
    lastAuthorId: PopulateAuthorIdDocument,
    terms: PopulateTermsDocument[]
    contents?: PostContentDocument | PostContentDocument[]
    themeGroups?: (Omit<PostThemeGroupDocument, "types"> & {
        types: (Omit<PostThemeGroupTypeDocument, "contents"> & {
            contents?: PostThemeGroupTypeContentDocument | PostThemeGroupTypeContentDocument[]
        })[]
    })[]
} & Omit<PostDocument, "contents"|"themeGroups">

export interface PostThemeGroupTypeContentDocument {
    _id?: mongoose.Types.ObjectId,
    langId:  mongoose.Types.ObjectId
    content: string
}

export interface PostThemeGroupTypeDocument {
    _id?: mongoose.Types.ObjectId,
    elementId: string
    typeId: number,
    langKey: string,
    order: number,
    contents: PostThemeGroupTypeContentDocument[]
}

export interface PostThemeGroupDocument {
    _id?: mongoose.Types.ObjectId
    elementId: string
    langKey: string,
    order: number,
    types: PostThemeGroupTypeDocument[]
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
    seoContent?: string
}

export interface PostDocument {
    _id?: mongoose.Types.ObjectId
    typeId: number,
    statusId: number,
    authorId: mongoose.Types.ObjectId
    lastAuthorId: mongoose.Types.ObjectId
    dateStart: Date,
    order: number,
    views: number,
    isFixed: boolean,
    terms: mongoose.Types.ObjectId[]
    contents: PostContentDocument[]
    themeGroups?: PostThemeGroupDocument[]
}