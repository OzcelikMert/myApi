import * as mongoose from "mongoose";
import {StatusId} from "../constants/status.const";
import userModel from "./user.model";
import languageModel from "./language.model";
import {NavigateContentDocument, NavigateDocument} from "../types/services/navigate";

const schemaContent = new mongoose.Schema<NavigateContentDocument>(
    {
        langId: {type: mongoose.Schema.Types.ObjectId, ref: languageModel, required: true},
        title: {type: String, default: ""},
        url: {type: String, default: ""},
    },
    {timestamps: true}
).index({langId: 1}, {unique: true});

const schema = new mongoose.Schema<NavigateDocument>(
    {
        statusId: {type: Number, required: true, enum: StatusId},
        mainId: {type: mongoose.Schema.Types.ObjectId, ref: "navigates"},
        authorId: {type: mongoose.Schema.Types.ObjectId, ref: userModel, required: true},
        lastAuthorId: {type: mongoose.Schema.Types.ObjectId, ref: userModel, required: true},
        order: {type: Number, default: 0},
        contents: {type: [schemaContent], default: []}
    },
    {timestamps: true}
).index({statusId: 1, mainId: 1}, {unique: true});

export default mongoose.model("navigates", schema)