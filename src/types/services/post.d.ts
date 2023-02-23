import mongoose from "mongoose";
import {PopulateAuthorIdDocument} from "./user";
import {PopulateTermsDocument} from "./postTerm";
import {
    PostContentDocument,
    PostDocument,
    PostECommerceDocument,
    PostECommerceVariationContentDocument,
    PostECommerceVariationDocument
} from "../models/post";
import {ComponentDocument} from "../models/component";

export interface PostDeleteManyParamDocument {
    _id: string[]
    typeId: number
}

export type PostUpdateManyStatusIdParamDocument = {
    _id: string[],
    typeId: number
    statusId: number,
    lastAuthorId: string
}

export type PostUpdateOneRankParamDocument = {
    _id: string
    typeId: number
    rank: number
    lastAuthorId: string
}

export type PostUpdateOneViewParamDocument = {
    _id: string,
    typeId: number
    langId: string
}

export type PostUpdateOneParamDocument = {
    _id?: string
} & Omit<PostAddParamDocument, "authorId">

export type PostAddParamDocument = {
    contents: PostContentDocument
    eCommerce?: (Omit<PostECommerceDocument, "variations"> & {
        variations?: (Omit<PostECommerceVariationDocument, "contents"> & {
            contents: PostECommerceVariationContentDocument
        })[]
    })
} & Omit<PostDocument, "_id"|"views"|"contents"|"eCommerce">

export interface PostGetManyParamDocument {
    _id?: string[]
    typeId: number[],
    pageTypeId?: number[]
    langId?: string
    statusId?: number,
    count?: number,
    page?: number
    ignorePostId?: string[]
    title?: string
    ignoreDefaultLanguage?: boolean
}

export interface PostGetOneParamDocument {
    typeId: number,
    _id?: string
    pageTypeId?: number
    langId?: string
    url?: string
    statusId?: number,
    ignorePostId?: string[]
}

export interface PostGetCountParamDocument {
    typeId: number[]
    statusId?: number
}

export interface PostAlternateDocument {
    langId: mongoose.Types.ObjectId | string
    title?: string,
    url?: string
}

export type PostGetResultDocument = {
    authorId: PopulateAuthorIdDocument,
    lastAuthorId: PopulateAuthorIdDocument,
    views?: number,
    categories?: PopulateTermsDocument[]
    tags?: PopulateTermsDocument[]
    contents?: PostContentDocument | PostContentDocument[]
    components?: ComponentDocument[],
    alternates?: PostAlternateDocument[]
    eCommerce?: (Omit<PostECommerceDocument<PopulateTermsDocument, PopulateTermsDocument[]>, "variations"> & {
        variations?: (Omit<PostECommerceVariationDocument<PopulateTermsDocument>, "contents"> & {
            contents?: PostECommerceVariationContentDocument | PostECommerceVariationContentDocument[]
        })[]
    })
} & Omit<PostDocument, "contents"|"categories"|"tags"|"components"|"eCommerce">