import mongoose from "mongoose";

export interface SubscriberDocument {
    _id: mongoose.Types.ObjectId | string
    email: string
}