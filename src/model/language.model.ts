import * as mongoose from "mongoose";
import {LanguageDocument} from "../types/services/language";

const schema = new mongoose.Schema<LanguageDocument>(
    {
        title: {type: String, required: true},
        image: {type: String, required: true},
        shortKey: {type: String, required: true}
    },
    {timestamps: true}
)

export default mongoose.model("languages", schema)