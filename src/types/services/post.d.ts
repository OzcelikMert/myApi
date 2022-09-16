import mongoose from "mongoose";
import {PopulateAuthorIdDocument} from "./user";
import {PopulateTermsDocument} from "./postTerm";
import {ThemeGroupTypeId} from "../../constants/themeGroupType.const";

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
    themeGroups?: (Omit<PostThemeGroupDocument, "types"> & {
        types: (Omit<PostThemeGroupTypeDocument, "contents"> & {
            contents: PostThemeGroupTypeContentDocument
        })[]
    })[]
}

export interface InsertPostParamDocument {
    typeId: number,
    statusId: number,
    order: number,
    authorId: mongoose.Types.ObjectId
    dateStart: Date,
    isFixed: boolean,
    contents: PostContentDocument
    themeGroups?: (Omit<PostThemeGroupDocument, "types"> & {
        types: (Omit<PostThemeGroupTypeDocument, "contents"> & {
            contents: PostThemeGroupTypeContentDocument
        })[]
    })[]
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
    contents?: PostContentDocument | PostContentDocument[]
    themeGroups?: (Omit<PostThemeGroupDocument, "types"> & {
        types: (Omit<PostThemeGroupTypeDocument, "contents"> & {
            contents?: PostThemeGroupTypeContentDocument | PostThemeGroupTypeContentDocument[]
        })[]
    })[]
} & Omit<PostDocument, "contents">

export interface PostThemeGroupTypeContentDocument {
    _id?: mongoose.Types.ObjectId
    langId: mongoose.Types.ObjectId
    content: string
}

export interface PostThemeGroupTypeDocument {
    _id?: mongoose.Types.ObjectId
    elementId: string
    typeId: number,
    langKey: string,
    contents: PostThemeGroupTypeContentDocument[]
}

export interface PostThemeGroupDocument {
    _id?: mongoose.Types.ObjectId
    elementId: string
    langKey: string,
    types: PostThemeGroupTypeDocument[]
}

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