import mongoose from "mongoose";
import {PopulateAuthorIdDocument} from "./user";

export interface SelectComponentParamDocument {
    _id?: string
    langId?: string,
    getContents?: boolean,
    elementId?: string
}

export interface DeleteComponentParamDocument {
    _id: string | string[]
}

export type UpdateComponentRankParamDocument = {
    _id?: string | string[],
    rank: number,
    lastAuthorId: string
}

export type UpdateComponentParamDocument = {
    _id?: string
} & Omit<InsertComponentParamDocument, "authorId">

export type InsertComponentParamDocument = {
    types?: (Omit<ComponentTypeDocument, "contents"> & {
        contents: ComponentTypeContentDocument
    })[]
} & Omit<ComponentDocument, "_id"|"types">

export type SelectComponentResultDocument = {
    authorId: PopulateAuthorIdDocument,
    lastAuthorId: PopulateAuthorIdDocument,
    types: (Omit<ComponentTypeDocument, "contents"> & {
        contents?: ComponentTypeContentDocument | ComponentTypeContentDocument[]
    })[]
} & Omit<ComponentDocument, "types">

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
    rank: number,
    types: ComponentTypeDocument[]
}