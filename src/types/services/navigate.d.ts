import mongoose from "mongoose";
import {PopulateAuthorIdDocument} from "./user";

export interface DeleteNavigateParamDocument {
    navigateId: string | string[]
}

export interface UpdateNavigateParamDocument {
    navigateId: string | string[],
    lastAuthorId: string
    mainId?: string
    statusId?: number
    order?: number
    contents?: InsertNavigateParamDocument["contents"]
}

export interface InsertNavigateParamDocument {
    statusId: number,
    mainId?: string
    authorId: string
    order: number,
    contents: Omit<NavigateContentDocument, "langId"> & {langId: string}
}

export interface SelectNavigateParamDocument {
    langId: string
    navigateId?: string
    statusId?: number,
}

export type SelectNavigateResultDocument = {
    contents?: NavigateContentDocument | NavigateContentDocument[]
    authorId: PopulateAuthorIdDocument,
    lastAuthorId: PopulateAuthorIdDocument,
    mainId?: {
        _id: mongoose.Types.ObjectId
        contents: {
            langId: mongoose.Types.ObjectId
            title: string,
            url: string,
        }[]
    }
} & Omit<NavigateDocument, "contents">

export interface NavigateContentDocument {
    langId: mongoose.Types.ObjectId
    title?: string,
    url?: string,
}

export interface NavigateDocument {
    _id: mongoose.Types.ObjectId
    mainId?: mongoose.Types.ObjectId
    statusId: number,
    authorId: mongoose.Types.ObjectId
    lastAuthorId: mongoose.Types.ObjectId
    order: number,
    contents: NavigateContentDocument[]
}
