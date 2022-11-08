import * as mongoose from "mongoose";
import userModel from "./user.model";
import {StatusId} from "../constants/status";
import {PostTypeId} from "../constants/postTypes";
import languageModel from "./language.model";
import postTermModel from "./postTerm.model";
import {
    PostContentButtonDocument,
    PostContentDocument,
    PostDocument
} from "../types/services/post";
import componentModel from "./component.model";

const schemaContentButton = new mongoose.Schema<PostContentButtonDocument>(
    {
        title: {type: String, default: ""},
        url: {type: String, default: ""}
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
        seoContent: {type: String, default: ""},
        views: {type: Number, default: 0},
        buttons: {type: [schemaContentButton]},
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
        isFixed: {type: Boolean},
        pageTypeId: {type: Number},
        terms: {type: [mongoose.Schema.Types.ObjectId], ref: postTermModel, default: []},
        contents: {type: [schemaContent], default: []},
        components: {type: [mongoose.Schema.Types.ObjectId], ref: componentModel},
        sitemap: {type: String, default: ""}
    },
    {timestamps: true}
).index({typeId: 1, statusId: 1, authorId: 1});

export default mongoose.model<PostDocument>("posts", schema)