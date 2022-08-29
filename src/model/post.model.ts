import * as mongoose from "mongoose";
import userModel from "./user.model";
import {PostTypeId, StatusId} from "../public/static";
import languageModel from "./language.model";
import PostTermModel from "./postTerm.model";
import {PostContentDocument, PostDocument} from "../types/services/post";

const schemaContent = new mongoose.Schema<PostContentDocument>(
    {
            langId: {type: mongoose.Schema.Types.ObjectId, ref: languageModel, required: true},
            image: {type: String, default: ""},
            title: {type: String, default: ""},
            content: {type: String, default: ""},
            shortContent: {type: String, default: ""},
            url: {type: String, default: ""},
            seoTitle: {type: String, default: ""},
            seoContent: {type: String, default: ""}
    },
    {timestamps: true}
).index({langId: 1}, {unique: true});

const schema = new mongoose.Schema<PostDocument>(
    {
        typeId: {type: Number, required: true, enum: PostTypeId},
        statusId: {type: Number, required: true, enum: StatusId},
        authorId: {type: mongoose.Schema.Types.ObjectId, ref: userModel, required: true},
        lastAuthorId: {type: mongoose.Schema.Types.ObjectId, ref: userModel, required: true},
        dateStart: {type: Date, default: new Date()},
        order: {type: Number, default: 0},
        views: {type: Number, default: 0},
        isFixed: {type: Boolean, default: false},
        terms: {type: [mongoose.Schema.Types.ObjectId], ref: PostTermModel, default: []},
        contents: {type: [schemaContent], default: []}
    },
    {timestamps: true}
).index({typeId: 1, statusId: 1, authorId: 1}, {unique: true});

export default mongoose.model("posts", schema)