import mongoose from "mongoose";

export interface PostTermDocument {
    _id: mongoose.Types.ObjectId | string
    postTypeId: number,
    typeId: number,
    mainId?: mongoose.Types.ObjectId | string
    statusId: number,
    authorId: mongoose.Types.ObjectId | string
    lastAuthorId: mongoose.Types.ObjectId | string
    rank: number,
    contents: PostTermContentDocument[]
    updatedAt?: string
    createdAt?: string
}

export interface PostTermContentDocument {
    langId: mongoose.Types.ObjectId | string
    image?: string,
    title?: string,
    shortContent?: string,
    url?: string,
}