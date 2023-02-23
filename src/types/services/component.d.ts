import {PopulateAuthorIdDocument} from "./user";
import {ComponentDocument, ComponentTypeContentDocument, ComponentTypeDocument} from "../models/component";

export interface ComponentDeleteManyParamDocument {
    _id: string[]
}

export type ComponentUpdateOneParamDocument = {
    _id: string
} & Omit<ComponentAddParamDocument, "authorId">

export type ComponentAddParamDocument = {
    types?: (Omit<ComponentTypeDocument, "contents"> & {
        contents: ComponentTypeContentDocument
    })[]
} & Omit<ComponentDocument, "_id"|"types">

export interface ComponentGetManyParamDocument {
    _id?: string[]
    langId?: string,
    elementId?: string[]
}

export interface ComponentGetOneParamDocument {
    _id?: string
    langId?: string,
    elementId?: string
}

export type ComponentGetResultDocument = {
    authorId: PopulateAuthorIdDocument,
    lastAuthorId: PopulateAuthorIdDocument,
    types: (Omit<ComponentTypeDocument, "contents"> & {
        contents?: ComponentTypeContentDocument | ComponentTypeContentDocument[]
    })[]
} & Omit<ComponentDocument, "types">