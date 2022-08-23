import * as mongoose from "mongoose";

const schemaSEOContent = new mongoose.Schema(
    {
        langId: {type: Number, required: true},
        title: {type: String},
        content: {type: String},
        tags: {type: [String], default: []}
    },
    {timestamps: true}
);

const schema = new mongoose.Schema(
    {
        languageId: {type: mongoose.Schema.Types.ObjectId, ref: "languages"},
        icon: {type: String, default: ""},
        logo: {type: String, default: ""},
        seoContents: {type: [schemaSEOContent], default: []}
    }
);

export default mongoose.model("settings", schema)