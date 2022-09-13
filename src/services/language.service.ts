import * as mongoose from "mongoose";
import V from "../library/variable";
import languageModel from "../models/language.model";
import {
    InsertLanguageDocument,
    LanguageDocument,
    SelectLanguageResultDocument,
    SelectLanguageParamDocument
} from "../types/services/language";

export default {
    async select(params: SelectLanguageParamDocument): Promise<SelectLanguageResultDocument[]> {
        let filters: mongoose.FilterQuery<LanguageDocument> = {}

        if (params.id) {
            filters = {
                ...filters,
                _id: params.id
            }
        }

        return await languageModel.find(filters, {}, {lean: true});
    },
    async insert(params: InsertLanguageDocument) {
        return await languageModel.create({
            ...params
        })
    }
};