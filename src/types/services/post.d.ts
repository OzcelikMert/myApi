import mongoose from "mongoose";
import {PopulateAuthorIdDocument} from "./user";
import {PopulateTermsDocument} from "./postTerm";
import {ComponentDocument} from "./component";

export interface DeletePostParamDocument {
    _id: string | string[]
    typeId: number
}

export type UpdatePostStatusIdParamDocument = {
    _id?: string | string[],
    typeId: number
    statusId: number,
    lastAuthorId: string
}

export type UpdatePostViewParamDocument = {
    _id?: string,
    typeId?: number
    langId: string
}

export type UpdatePostParamDocument = {
    _id?: string
} & Omit<InsertPostParamDocument, "authorId">

export type InsertPostParamDocument = {
    contents?: Omit<PostContentDocument, "_id">
} & Omit<PostDocument, "_id"|"views"|"contents">

export interface SelectPostParamDocument {
    _id?: string
    typeId?: number | number[],
    pageTypeId?: number
    langId?: string
    url?: string
    statusId?: number,
    getContents?: boolean,
    count?: number,
    page?: number
    ignorePostId?: string[]
    title?: string
}

export interface SelectPostCountParamDocument {
    typeId?: number | number[]
    pageTypeId?: number
    url?: string
    statusId?: number
    ignorePostId?: string[]
    title?: string
}

export interface SelectPostCountForTypeParamDocument {
    typeId?: number | number[]
}

export type SelectPostResultDocument = {
    authorId: PopulateAuthorIdDocument,
    lastAuthorId: PopulateAuthorIdDocument,
    views?: number,
    terms: PopulateTermsDocument[]
    contents?: PostContentDocument | PostContentDocument[]
    components?: ComponentDocument[],
    alternates?: PostAlternateDocument[]
} & Omit<PostDocument, "contents"|"themeGroups"|"terms"|"components">

export interface PostAlternateDocument {
    langId: mongoose.Types.ObjectId | string
    title?: string,
    url?: string
}

export interface PostECommerceVariationContentDocument {
    _id?: mongoose.Types.ObjectId | string
    langId: mongoose.Types.ObjectId | string
    image?: string
    content?: string,
    shortContent?: string,
}

export interface PostECommerceVariationSelectedDocument {
    _id?: mongoose.Types.ObjectId | string
    attributeId: mongoose.Types.ObjectId | string
    variationId: mongoose.Types.ObjectId | string
}

export interface PostECommerceVariationDocument {
    _id?: mongoose.Types.ObjectId | string
    order: number
    selectedVariations: PostECommerceVariationSelectedDocument[]
    images: string[]
    contents?: PostECommerceVariationContentDocument | PostECommerceVariationContentDocument[]
    inventory: PostECommerceInventoryDocument
    shipping: PostECommerceShippingDocument
    pricing: PostECommercePricingDocument
}

export interface PostECommerceAttributeDocument {
    _id?: mongoose.Types.ObjectId | string
    attributeId: mongoose.Types.ObjectId | string
    variationId: mongoose.Types.ObjectId[] | string[]
    typeId: number
}

export interface PostECommerceShippingDocument {
    width: string
    height: string
    depth: string
    weight: string
}

export interface PostECommerceInventoryDocument {
    sku: string
    isManageStock: boolean
    quantity: number
}

export interface PostECommercePricingDocument {
    taxRate: number
    taxExcluded: number
    taxIncluded: number
    compared: number
    shipping: number
}

export interface PostECommerceDocument {
    typeId: number
    images: string[]
    pricing?: PostECommercePricingDocument
    inventory?: PostECommerceInventoryDocument
    shipping?: PostECommerceShippingDocument
    attributes?: PostECommerceAttributeDocument[]
    variations?: PostECommerceVariationDocument[]
    variationDefaults?: PostECommerceVariationSelectedDocument[]
}

export interface PostContentButtonDocument {
    _id?: mongoose.Types.ObjectId | string
    title: string,
    url?: string
}

export interface PostContentDocument {
    _id?: mongoose.Types.ObjectId | string
    langId: mongoose.Types.ObjectId | string
    image?: string
    icon?: string
    title?: string,
    content?: string,
    shortContent?: string,
    url?: string,
    seoTitle?: string,
    seoContent?: string,
    views?: number,
    buttons?: PostContentButtonDocument[]
}

export interface PostDocument {
    _id?: mongoose.Types.ObjectId | string
    typeId?: number,
    statusId: number,
    pageTypeId?: number,
    authorId: mongoose.Types.ObjectId | string
    lastAuthorId: mongoose.Types.ObjectId | string
    dateStart: Date,
    order: number,
    isFixed?: boolean,
    terms: mongoose.Types.ObjectId[] | string[]
    contents: PostContentDocument[]
    components?: mongoose.Types.ObjectId[] | string []
    sitemap?: string
    eCommerce?: PostECommerceDocument
}