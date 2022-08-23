import * as mongoose from "mongoose";

const schemaContent = new mongoose.Schema(
    {
            langId: {type: Number, required: true},
            image: {type: String},
            title: {type: String},
            shortContent: {type: String},
            url: {type: String},
            seoTitle: {type: String},
            seoContent: {type: String}
    },
    {timestamps: true}
);

const schema = new mongoose.Schema(
    {
        postTypeId: {type: Number, required: true},
        mainId: {type: mongoose.Schema.Types.ObjectId, ref: "postTerms"},
        typeId: {type: Number, required: true},
        authorId: {type: mongoose.Schema.Types.ObjectId, ref: "users", required: true},
        statusId: {type: Number, required: true},
        order: {type: Number, default: 0},
        views: {type: Number, default: 0},
        isFixed: {type: Boolean, default: false},
        contents: {type: [schemaContent], default: []}
    },
    {timestamps: true}
);

export default mongoose.model("postTerms", schema)