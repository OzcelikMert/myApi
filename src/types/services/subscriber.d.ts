import {SubscriberDocument} from "../models/subscriber";

export interface SubscriberDeleteOneWithEmailParamDocument {
    email: string
}

export interface SubscriberDeleteManyParamDocument {
    _id: string[]
}

export interface SubscriberGetManyParamDocument {
    _id?: string[]
    email?: string
}

export interface SubscriberGetOneParamDocument {
    _id: string
}

export interface SubscriberGetOneWithEmailParamDocument {
    email: string
}

export type SubscriberAddDocument = {} & Omit<SubscriberDocument, "_id">

export type SubscriberGetResultDocument = {} & SubscriberDocument