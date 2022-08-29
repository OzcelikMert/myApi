import * as mongoose from "mongoose";
import {PostTermTypeId, PostTypeId, StatusId} from "../public/static";
import userModel from "./user.model";
import languageModel from "./language.model";

const schemaContent = new mongoose.Schema(
    {
            langId: {type: mongoose.Schema.Types.ObjectId, ref: languageModel, required: true},
            image: {type: String},
            title: {type: String},
            shortContent: {type: String},
            url: {type: String},
            seoTitle: {type: String},
            seoContent: {type: String}
    },
    {timestamps: true}
).index({langId: 1}, {unique: true});

const schema = new mongoose.Schema(
    {
        postTypeId: {type: Number, required: true, enum: PostTypeId},
        statusId: {type: Number, required: true, enum: StatusId},
        mainId: {type: mongoose.Schema.Types.ObjectId},
        typeId: {type: Number, required: true, enum: PostTermTypeId},
        authorId: {type: mongoose.Schema.Types.ObjectId, ref: userModel, required: true},
        order: {type: Number, default: 0},
        views: {type: Number, default: 0},
        isFixed: {type: Boolean, default: false},
        contents: {type: [schemaContent], default: []}
    },
    {timestamps: true}
).index({typeId: 1, postTypeId: 1, statusId: 1, authorId: 1, mainId: 1}, {unique: true});

export default mongoose.model("postTerms", schema)