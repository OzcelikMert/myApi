import * as mongoose from "mongoose";
import V from "../library/variable";
import languageModel from "../models/language.model";
import {
    InsertLanguageDocument,
    LanguageDocument,
    SelectLanguageResultDocument,
    SelectLanguageParamDocument
} from "../types/services/language";
import MongoDBHelpers from "../library/mongodb/helpers";
import Variable from "../library/variable";

export default {
    async select(params: SelectLanguageParamDocument): Promise<SelectLanguageResultDocument[]> {
        let filters: mongoose.FilterQuery<LanguageDocument> = {}

        if (params.id) {
            filters = {
                ...filters,
                _id: MongoDBHelpers.createObjectId(params.id)
            }
        }

        return await languageModel.find(filters, {}).lean().exec();
    },
    async insert(params: InsertLanguageDocument) {
        params = Variable.clearAllScriptTags(params);

        return await languageModel.create({
            ...params
        })
    }
};