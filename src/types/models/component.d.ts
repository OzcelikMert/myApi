import mongoose from "mongoose";

export interface ComponentTypeContentDocument {
    _id?: mongoose.Types.ObjectId | string,
    langId:  mongoose.Types.ObjectId | string
    content?: string
    url?: string
    comment?: string
}

export interface ComponentTypeDocument {
    _id?: mongoose.Types.ObjectId | string,
    elementId: string
    typeId: number,
    langKey: string,
    rank: number,
    contents: ComponentTypeContentDocument[]
}

export interface ComponentDocument {
    _id?: mongoose.Types.ObjectId | string,
    authorId: mongoose.Types.ObjectId | string
    lastAuthorId: mongoose.Types.ObjectId | string
    elementId: string
    langKey: string,
    types: ComponentTypeDocument[]
}