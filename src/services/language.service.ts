import * as mongoose from "mongoose";
import V from "../library/variable";
import languageModel from "../model/language.model";
import {InsertLanguageDocument, LanguageDocument, SelectLanguageParamDocument} from "../types/services/language";

export default {
    async select(params: SelectLanguageParamDocument): Promise<LanguageDocument[]> {
        params = V.clearAllData(params);

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
        params = V.clearAllData(params);

        return await languageModel.create({
            ...params
        })
    }
};