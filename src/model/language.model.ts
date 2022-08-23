import * as mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        title: {type: String, required: true},
        image: {type: String, required: true},
        shortKey: {type: String, required: true}
    },
    {timestamps: true}
)

export default mongoose.model("languages", schema)