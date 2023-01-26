import mongoose from "mongoose";

export interface SelectUserParamDocument {
    _id?: string
    statusId?: number
    email?: string,
    password?: string,
    url?: string,
    maxCount?: number,
    roleId?: number
    ignoreUserId?: string[]
}

export type DeleteUserParamDocument = {
    _id: string
}

export type UpdateUserPasswordParamDocument = {
    _id: string
    password: string
}

export type UpdateUserProfileParamDocument = {
    _id: string
} & Omit<UserDocument, "_id"|"password"|"permissions"|"roleId"|"statusId"|"email"|"banComment"|"banDateEnd">

export type UpdateUserParamDocument = {
    _id: string
} & Omit<UserDocument, "_id">

export type InsertUserParamDocument = {
    password: string
} & Omit<UserDocument, "_id"|"password">


export type SelectUserResultDocument = {
    isOnline?: boolean
} & UserDocument

export interface PopulateAuthorIdDocument {
    _id: mongoose.Types.ObjectId | string
    name: string,
    email: string,
    url: string
}

export interface UserDocument {
    _id: mongoose.Types.ObjectId | string
    roleId: number,
    statusId: number,
    name: string,
    email: string,
    image?: string,
    url?: string,
    comment?: string,
    phone?: string,
    password?: string,
    permissions: number[],
    banDateEnd?: Date,
    banComment?: string,
    facebook?: string,
    instagram?: string,
    twitter?: string
}