import * as mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        url: {type: String, required: true},
        languageId: {type: mongoose.Schema.Types.ObjectId, ref: "languages"},
        ip: {type: String, default: "", required: true},
        country: {type: String, default: ""},
        city: {type: String, default: ""},
        region: {type: String, default: ""}
    },
    {timestamps: true}
)

export default mongoose.model("views", schema)