import mongoose from "mongoose";

export interface ViewDocument {
    _id: mongoose.Types.ObjectId | string
    url: string,
    langId: mongoose.Types.ObjectId | string
    ip: string,
    country: string,
    city: string,
    region: string
}