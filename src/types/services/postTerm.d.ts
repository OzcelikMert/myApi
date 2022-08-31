import mongoose from "mongoose";

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
    postTypeId: number,
    typeId: number,
    statusId: number,
    mainId?: mongoose.Types.ObjectId
    authorId: mongoose.Types.ObjectId,
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