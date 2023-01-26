import mongoose from "mongoose";

export type InsertLogParamDocument = {} & Omit<LogDocument, "_id">

export interface LogDocument {
    _id: mongoose.Types.ObjectId | string
    url: string,
    method: string
    ip: string
    message?: string
    userId?: string
    params?: object
    body?: object
    query?: object
}