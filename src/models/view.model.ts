import * as mongoose from "mongoose";
import languageModel from "./language.model";
import {ViewDocument} from "../types/services/view";

const schema = new mongoose.Schema<ViewDocument>(
    {
        url: {type: String, required: true},
        languageId: {type: mongoose.Schema.Types.ObjectId, ref: languageModel, required: true},
        ip: {type: String, default: "", required: true},
        country: {type: String, default: ""},
        city: {type: String, default: ""},
        region: {type: String, default: ""}
    },
    {timestamps: true}
).index({languageId: 1})

export default mongoose.model("views", schema)