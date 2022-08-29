import mongoose from "mongoose";

export interface DeletePostParamDocument {
    postId: mongoose.Types.ObjectId | mongoose.Types.ObjectId[]
}

export interface UpdatePostParamDocument {
    postId: mongoose.Types.ObjectId | mongoose.Types.ObjectId[],
    typeId?: number,
    statusId?: number,
    order?: number,
    lastAuthorId: mongoose.Types.ObjectId,
    dateStart?: Date,
    isFixed?: boolean,
    contents?: InsertPostParamDocument["contents"]
}

export interface InsertPostParamDocument {
    typeId: number,
    statusId: number,
    order: number,
    authorId: mongoose.Types.ObjectId,
    dateStart: Date,
    isFixed: boolean,
    contents: PostContentDocument
}

export interface SelectPostParamDocument {
    postId?: mongoose.Types.ObjectId,
    typeId?: number | number[],
    langId: mongoose.Types.ObjectId,
    url?: string
    statusId?: number,
    getContents?: boolean,
    maxCount?: number
}

export interface PostContentDocument {
    langId: mongoose.Types.ObjectId,
    image?: string,
    title?: string,
    content?: string,
    shortContent?: string,
    url?: string,
    seoTitle?: string,
    seoContent?: string
}

export interface PostDocument {
    typeId: number,
    statusId: number,
    authorId: mongoose.Types.ObjectId,
    lastAuthorId: mongoose.Types.ObjectId,
    dateStart: Date,
    order: number,
    views: number,
    isFixed: boolean,
    terms: mongoose.Types.ObjectId[],
    contents: PostContentDocument[]
}