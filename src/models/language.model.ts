import * as mongoose from "mongoose";
import {LanguageDocument} from "../types/services/language";
import {StatusId} from "../constants/status.const";

const schema = new mongoose.Schema<LanguageDocument>(
    {
        title: {type: String, required: true},
        image: {type: String, required: true},
        shortKey: {type: String, required: true},
        statusId: {type: Number, required: true, enum: StatusId}
    },
    {timestamps: true}
)

export default mongoose.model("languages", schema)