import mongoose from "mongoose";


export interface DeleteSubscriberParamDocument {
    _id?: string[]
    email?: string
}

export interface SelectSubscriberParamDocument {
    id?: string
    email?: string
}

export type InsertSubscriberDocument = {
} & Omit<SubscriberDocument, "_id">

export type SelectSubscriberResultDocument = {} & SubscriberDocument

export interface SubscriberDocument {
    _id: mongoose.Types.ObjectId
    email: string
}