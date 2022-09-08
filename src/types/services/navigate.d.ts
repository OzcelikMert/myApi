import mongoose from "mongoose";
import {PopulateAuthorIdDocument} from "./user";

export interface DeleteNavigateParamDocument {
    navigateId: mongoose.Types.ObjectId | mongoose.Types.ObjectId[]
}

export interface UpdateNavigateParamDocument {
    navigateId: mongoose.Types.ObjectId | mongoose.Types.ObjectId[],
    lastAuthorId: mongoose.Types.ObjectId
    mainId?: mongoose.Types.ObjectId
    statusId?: number
    order?: number
    contents?: InsertNavigateParamDocument["contents"]
}

export interface InsertNavigateParamDocument {
    statusId: number,
    mainId?: mongoose.Types.ObjectId
    authorId: mongoose.Types.ObjectId
    order: number,
    contents: NavigateContentDocument
}

export interface SelectNavigateParamDocument {
    langId: mongoose.Types.ObjectId
    navigateId?: mongoose.Types.ObjectId
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
