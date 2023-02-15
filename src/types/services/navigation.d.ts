import mongoose from "mongoose";
import {PopulateAuthorIdDocument} from "./user";

export interface DeleteNavigationParamDocument {
    _id: string | string[]
}

export type UpdateNavigationStatusIdParamDocument = {
    _id?: string | string[],
    statusId: number,
    lastAuthorId: string
}

export type UpdateNavigationParamDocument = {
    _id?: string
} & Omit<InsertNavigationParamDocument, "authorId">

export type InsertNavigationParamDocument = {
    contents?: Omit<NavigationContentDocument, "_id">
} & Omit<NavigationDocument, "_id"|"contents">

export interface SelectNavigationParamDocument {
    _id?: string
    langId?: string
    url?: string
    statusId?: number
    ignoreDefaultLanguage?: boolean
}

export type SelectNavigationResultDocument = {
    authorId: PopulateAuthorIdDocument,
    lastAuthorId: PopulateAuthorIdDocument,
    mainId?: {
        _id: mongoose.Types.ObjectId | string
        contents: {
            langId: mongoose.Types.ObjectId | string
            title: string,
            url: string,
        }
    },
    contents?: NavigationContentDocument | NavigationContentDocument[]
} & Omit<NavigationDocument, "contents">

export interface NavigationContentDocument {
    _id?: mongoose.Types.ObjectId | string
    langId: mongoose.Types.ObjectId | string
    title?: string,
    url?: string,
}

export interface NavigationDocument {
    _id?: mongoose.Types.ObjectId | string
    statusId: number,
    mainId?: mongoose.Types.ObjectId | string
    authorId: mongoose.Types.ObjectId | string
    lastAuthorId: mongoose.Types.ObjectId | string
    order: number,
    contents: NavigationContentDocument[]
}