import * as mongoose from "mongoose";
import {SelectLanguageParamDocument} from "../../types/services/language";
import V from "../../library/variable";
import languageModel, {InsertLanguageDocument, LanguageDocument} from "../../model/language.model";

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
            title: params.title,
            image: params.image,
            shortKey: params.shortKey
        })
    }
};