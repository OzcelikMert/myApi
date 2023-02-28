import mongoose from "mongoose";
import {UserDocument} from "../models/user";

export type UserDeleteOneParamDocument = {
    _id: string
}

export type UserUpdatePasswordParamDocument = {
    _id: string
    password: string
}

export type UserUpdateProfileParamDocument = {
    _id: string
} & Omit<UserDocument, "_id"|"password"|"permissions"|"roleId"|"statusId"|"email"|"banComment"|"banDateEnd">

export type UserUpdateOneParamDocument = {
    _id: string
} & Omit<UserDocument, "_id">

export type UserAddParamDocument = {
    password: string
} & Omit<UserDocument, "_id"|"password">

export interface UserGetOneLoginParamDocument {
    email: string,
    password: string,
}

export interface UserGetOneWithUrlParamDocument {
    url: string
}

export interface UserGetOneParamDocument {
    _id?: string
    email?: string
    statusId?: number
    url?: string
    ignoreUserId?: string[]
}

export interface UserGetManyParamDocument {
    _id?: string[]
    statusId?: number
    email?: string,
    count?: number,
    page?: number
    roleId?: number
    ignoreUserId?: string[]
}

export type UserGetResultDocument = {
    isOnline?: boolean
} & UserDocument

export interface UserPopulateDocument {
    _id: mongoose.Types.ObjectId | string
    name: string,
    url: string,
    image: string
}