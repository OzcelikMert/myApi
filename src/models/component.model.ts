import * as mongoose from "mongoose";
import {ComponentDocument, ComponentTypeContentDocument, ComponentTypeDocument} from "../types/services/component";
import languageModel from "./language.model";
import userModel from "./user.model";
import {ComponentTypeId} from "../constants/componentTypes";

const schemaTypeContent = new mongoose.Schema<ComponentTypeContentDocument>(
    {
            langId: {type: mongoose.Schema.Types.ObjectId, ref: languageModel, required: true},
            content: {type: String, default: ""},
            url: {type: String},
            comment: {type: String}
    }
).index({langId: 1});

const schemaType = new mongoose.Schema<ComponentTypeDocument>(
    {
            typeId: {type: Number, required: true, enum: ComponentTypeId},
            langKey: {type: String, required: true},
            elementId: {type: String, required: true},
            order: {type: Number, default: 0},
            contents: {type: [schemaTypeContent], default: []}
    }
);

const schema = new mongoose.Schema<ComponentDocument>(
    {
            authorId: {type: mongoose.Schema.Types.ObjectId, ref: userModel, required: true},
            lastAuthorId: {type: mongoose.Schema.Types.ObjectId, ref: userModel, required: true},
            langKey: {type: String, required: true},
            elementId: {type: String, required: true},
            order: {type: Number, default: 0},
            types: {type: [schemaType], default: []}
    },
    {timestamps: true}
).index({typeId: 1, statusId: 1, authorId: 1});

export default mongoose.model<ComponentDocument>("components", schema)