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

export type UpdateComponentParamDocument = {
    _id: string,
    lastAuthorId: string
    types: (Omit<ComponentTypeDocument, "contents"|"_id"> & {
        _id?: string
        contents: Omit<ComponentTypeContentDocument, "langId"|"_id"> & {langId: string}
    })[]
} & Omit<InsertComponentParamDocument, "authorId"|"types">

export type InsertComponentParamDocument = {
    authorId: string
    types: (Omit<ComponentTypeDocument, "contents"|"_id"> & {
        contents: Omit<ComponentTypeContentDocument, "langId"|"_id"> & {langId: string}
    })[]
} & Omit<ComponentDocument, "_id"|"lastAuthorId"|"authorId"|"types">

export type SelectComponentResultDocument = {
    authorId: PopulateAuthorIdDocument,
    lastAuthorId: PopulateAuthorIdDocument,
    types: (Omit<ComponentTypeDocument, "contents"> & {
        contents?: ComponentTypeContentDocument | ComponentTypeContentDocument[]
    })[]
} & Omit<ComponentDocument, "types">

export interface ComponentTypeContentDocument {
    _id?: mongoose.Types.ObjectId,
    langId:  mongoose.Types.ObjectId
    content?: string
    url?: string
    comment?: string
}

export interface ComponentTypeDocument {
    _id?: mongoose.Types.ObjectId,
    elementId: string
    typeId: number,
    langKey: string,
    order: number,
    contents: ComponentTypeContentDocument[]
}

export interface ComponentDocument {
    _id?: mongoose.Types.ObjectId,
    authorId: mongoose.Types.ObjectId
    lastAuthorId: mongoose.Types.ObjectId
    elementId: string
    langKey: string,
    order: number,
    types: ComponentTypeDocument[]
}