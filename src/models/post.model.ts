import * as mongoose from "mongoose";
import userModel from "./user.model";
import {StatusId} from "../constants/status.const";
import {PostTypeId} from "../constants/postType.const";
import languageModel from "./language.model";
import PostTermModel from "./postTerm.model";
import {
    PostContentDocument,
    PostDocument, PostThemeGroupDocument,
    PostThemeGroupTypeContentDocument,
    PostThemeGroupTypeDocument
} from "../types/services/post";
import {ThemeGroupTypeId} from "../constants/themeGroupType.const";

const schemaThemeGroupTypeContent = new mongoose.Schema<PostThemeGroupTypeContentDocument>(
    {
        langId: {type: mongoose.Schema.Types.ObjectId, ref: languageModel, required: true},
        content: {type: String, default: ""},
        url: {type: String},
        comment: {type: String}
    }
).index({langId: 1});

const schemaThemeGroupType = new mongoose.Schema<PostThemeGroupTypeDocument>(
    {
        typeId: {type: Number, required: true, enum: ThemeGroupTypeId},
        langKey: {type: String, required: true},
        elementId: {type: String, required: true},
        order: {type: Number, default: 0},
        contents: {type: [schemaThemeGroupTypeContent], default: []}
    }
);

const schemaThemeGroup = new mongoose.Schema<PostThemeGroupDocument>(
    {
        langKey: {type: String, required: true},
        elementId: {type: String, required: true},
        order: {type: Number, default: 0},
        types: {type: [schemaThemeGroupType], default: []}
    }
);

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
    }
).index({langId: 1});

const schema = new mongoose.Schema<PostDocument>(
    {
        typeId: {type: Number, enum: PostTypeId, default: PostTypeId.Blog},
        statusId: {type: Number, required: true, enum: StatusId},
        mainId: {type: mongoose.Schema.Types.ObjectId, ref: "posts"},
        authorId: {type: mongoose.Schema.Types.ObjectId, ref: userModel, required: true},
        lastAuthorId: {type: mongoose.Schema.Types.ObjectId, ref: userModel, required: true},
        dateStart: {type: Date, default: new Date()},
        order: {type: Number, default: 0},
        views: {type: Number, default: 0},
        isFixed: {type: Boolean, default: false},
        isPrimary: {type: Boolean},
        terms: {type: [mongoose.Schema.Types.ObjectId], ref: PostTermModel, default: []},
        contents: {type: [schemaContent], default: []},
        themeGroups: {type: [schemaThemeGroup]}
    },
    {timestamps: true}
).index({typeId: 1, statusId: 1, authorId: 1});

export default mongoose.model<PostDocument>("posts", schema)