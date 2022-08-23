import * as mongoose from "mongoose";
import userModel from "./user.model";

const schemaContent = new mongoose.Schema(
    {
            langId: {type: Number, required: true},
            image: {type: String},
            title: {type: String},
            content: {type: String},
            shortContent: {type: String},
            url: {type: String},
            seoTitle: {type: String},
            seoContent: {type: String}
    },
    {timestamps: true}
);

const schema = new mongoose.Schema(
    {
        typeId: {type: Number, required: true},
        authorId: {type: mongoose.Schema.Types.ObjectId, ref: userModel, required: true},
        statusId: {type: Number, required: true},
        dateStart: {type: String},
        order: {type: Number, default: 0},
        views: {type: Number, default: 0},
        isFixed: {type: Boolean, default: false},
        terms: {type: [mongoose.Schema.Types.ObjectId], ref: "postTerms", default: []},
        contents: {type: [schemaContent], default: []}
    },
    {timestamps: true}
);

export default mongoose.model("posts", schema)