import * as mongoose from "mongoose";

export type InsertLanguageDocument = {

} & LanguageDocument

export interface LanguageDocument {
    title: string,
    image: string,
    shortKey: string
}

const schema = new mongoose.Schema<LanguageDocument>(
    {
        title: {type: String, required: true},
        image: {type: String, required: true},
        shortKey: {type: String, required: true}
    },
    {timestamps: true}
)

export default mongoose.model("languages", schema)