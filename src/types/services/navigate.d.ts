import mongoose from "mongoose";

export interface DeleteNavigateParamDocument {
    navigateId: mongoose.Types.ObjectId | mongoose.Types.ObjectId[]
}

export interface UpdateNavigateParamDocument {
    navigateId: mongoose.Types.ObjectId | mongoose.Types.ObjectId[],
    lastAuthorId: mongoose.Types.ObjectId,
    mainId?: mongoose.Types.ObjectId
    statusId?: number
    order?: number
    contents?: InsertNavigateParamDocument["contents"]
}

export interface InsertNavigateParamDocument {
    statusId: number,
    mainId?: mongoose.Types.ObjectId
    authorId: mongoose.Types.ObjectId,
    order: number,
    contents: NavigateContentDocument
}

export interface SelectNavigateParamDocument {
    langId: mongoose.Types.ObjectId,
    navigateId?: mongoose.Types.ObjectId,
    statusId?: number,
}

export interface NavigateContentDocument {
    langId: mongoose.Types.ObjectId,
    title?: string,
    url?: string,
}

export interface NavigateDocument {
    mainId?: mongoose.Types.ObjectId
    statusId: number,
    authorId: mongoose.Types.ObjectId,
    lastAuthorId: mongoose.Types.ObjectId,
    order: number,
    contents: NavigateContentDocument[]
}
