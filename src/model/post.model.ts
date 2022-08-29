import * as mongoose from "mongoose";
import userModel from "./user.model";
import {PostTypeId, StatusId} from "../public/static";
import languageModel from "./language.model";
import PostTermModel from "./postTerm.model";

export interface DeletePostParamDocument {
    postId: mongoose.Types.ObjectId | mongoose.Types.ObjectId[]
}

export interface UpdatePostParamDocument {
    postId: mongoose.Types.ObjectId | mongoose.Types.ObjectId[],
    typeId?: number,
    statusId?: number,
    order?: number,
    authorId: mongoose.Types.ObjectId,
    dateStart?: Date,
    isFixed?: boolean,
    contents?: InsertPostParamDocument["contents"]
}

export interface InsertPostParamDocument {
    typeId: number,
    statusId: number,
    order: number,
    authorId: mongoose.Types.ObjectId,
    dateStart: Date,
    isFixed: boolean,
    contents: {
        langId: mongoose.Types.ObjectId,
        image?: string,
        title?: string,
        content?: string,
        shortContent?: string,
        url?: string,
        seoTitle?: string,
        seoContent?: string
    }
}

export interface SelectPostParamDocument {
    postId?: mongoose.Types.ObjectId,
    typeId?: number | number[],
    langId: mongoose.Types.ObjectId,
    url?: string
    statusId?: number,
    getContents?: boolean,
    maxCount?: number
}

export interface PostContentDocument {
    langId: mongoose.Types.ObjectId,
    image: string,
    title: string,
    content: string,
    shortContent: string,
    url: string,
    seoTitle: string,
    seoContent: string
}

export interface PostDocument {
    typeId: number,
    statusId: number,
    authorId: mongoose.Types.ObjectId,
    lastAuthorId: mongoose.Types.ObjectId,
    dateStart: Date,
    order: number,
    views: number,
    isFixed: boolean,
    terms: mongoose.Types.ObjectId[],
    contents: PostContentDocument[]
}

const schemaContent = new mongoose.Schema<PostContentDocument>(
    {
            langId: {type: mongoose.Schema.Types.ObjectId, ref: languageModel, required: true},
            image: {type: String},
            title: {type: String},
            content: {type: String},
            shortContent: {type: String},
            url: {type: String},
            seoTitle: {type: String},
            seoContent: {type: String}
    },
    {timestamps: true}
).index({langId: 1}, {unique: true});

const schema = new mongoose.Schema<PostDocument>(
    {
        typeId: {type: Number, required: true, enum: PostTypeId},
        statusId: {type: Number, required: true, enum: StatusId},
        authorId: {type: mongoose.Schema.Types.ObjectId, ref: userModel, required: true},
        lastAuthorId: {type: mongoose.Schema.Types.ObjectId, ref: userModel, required: true},
        dateStart: {type: Date, required: true, default: new Date()},
        order: {type: Number, default: 0},
        views: {type: Number, default: 0},
        isFixed: {type: Boolean, default: false},
        terms: {type: [mongoose.Schema.Types.ObjectId], ref: PostTermModel, default: []},
        contents: {type: [schemaContent], default: []}
    },
    {timestamps: true}
).index({typeId: 1, statusId: 1, authorId: 1}, {unique: true});

export default mongoose.model("posts", schema)