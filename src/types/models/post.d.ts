import mongoose from "mongoose";

export interface PostDocument {
    _id?: mongoose.Types.ObjectId | string
    typeId?: number,
    statusId: number,
    pageTypeId?: number,
    authorId: mongoose.Types.ObjectId | string
    lastAuthorId: mongoose.Types.ObjectId | string
    dateStart: Date,
    rank: number,
    isFixed?: boolean,
    categories?: mongoose.Types.ObjectId[] | string[]
    tags?: mongoose.Types.ObjectId[] | string[]
    contents: PostContentDocument[]
    components?: mongoose.Types.ObjectId[] | string []
    beforeAndAfter?: PostBeforeAndAfterDocument
    eCommerce?: PostECommerceDocument
    updatedAt?: string
    createdAt?: string
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
    views?: number,
    buttons?: PostContentButtonDocument[]
}

export interface PostBeforeAndAfterDocument {
    imageBefore: string
    imageAfter: string
    images: string[]
}

export interface PostContentButtonDocument {
    _id?: mongoose.Types.ObjectId | string
    title: string,
    url?: string
}

export interface PostECommerceDocument<T = mongoose.Types.ObjectId | string, P = mongoose.Types.ObjectId[] | string[]> {
    typeId: number
    images: string[]
    pricing?: PostECommercePricingDocument
    inventory?: PostECommerceInventoryDocument
    shipping?: PostECommerceShippingDocument
    attributes?: PostECommerceAttributeDocument<T, P>[]
    variations?: PostECommerceVariationDocument<T>[]
    variationDefaults?: PostECommerceVariationSelectedDocument<T>[]
}

export interface PostECommercePricingDocument {
    taxRate: number
    taxExcluded: number
    taxIncluded: number
    compared: number
    shipping: number
}

export interface PostECommerceInventoryDocument {
    sku: string
    isManageStock: boolean
    quantity: number
}

export interface PostECommerceShippingDocument {
    width: string
    height: string
    depth: string
    weight: string
}

export interface PostECommerceAttributeDocument<T = mongoose.Types.ObjectId | string, P = mongoose.Types.ObjectId[] | string[]> {
    _id?: mongoose.Types.ObjectId | string
    attributeId: T
    variations: P
    typeId: number
}

export interface PostECommerceVariationDocument<T = mongoose.Types.ObjectId | string> {
    _id?: mongoose.Types.ObjectId | string
    rank: number
    selectedVariations: PostECommerceVariationSelectedDocument<T>[]
    images: string[]
    contents?: PostECommerceVariationContentDocument[]
    inventory: PostECommerceInventoryDocument
    shipping: PostECommerceShippingDocument
    pricing: PostECommercePricingDocument
}

export interface PostECommerceVariationSelectedDocument<T = mongoose.Types.ObjectId | string> {
    _id?: mongoose.Types.ObjectId | string
    attributeId: T
    variationId: T
}

export interface PostECommerceVariationContentDocument {
    _id?: mongoose.Types.ObjectId | string
    langId: mongoose.Types.ObjectId | string
    image?: string
    content?: string,
    shortContent?: string,
}