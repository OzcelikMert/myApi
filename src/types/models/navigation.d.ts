import mongoose from "mongoose";

export interface NavigationDocument {
    _id?: mongoose.Types.ObjectId | string
    statusId: number,
    mainId?: mongoose.Types.ObjectId | string
    authorId: mongoose.Types.ObjectId | string
    lastAuthorId: mongoose.Types.ObjectId | string
    rank: number,
    contents: NavigationContentDocument[]
}

export interface NavigationContentDocument {
    _id?: mongoose.Types.ObjectId | string
    langId: mongoose.Types.ObjectId | string
    title?: string,
    url?: string,
}