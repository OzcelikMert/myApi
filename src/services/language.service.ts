import * as mongoose from "mongoose";
import languageModel from "../models/language.model";
import {
    InsertLanguageDocument,
    LanguageDocument,
    SelectLanguageResultDocument,
    SelectLanguageParamDocument
} from "../types/services/language";
import MongoDBHelpers from "../library/mongodb/helpers";
import Variable from "../library/variable";
import languageObjectIdKeys from "../constants/objectIdKeys/language.objectIdKeys";

export default {
    async select(params: SelectLanguageParamDocument): Promise<SelectLanguageResultDocument[]> {
        let filters: mongoose.FilterQuery<LanguageDocument> = {}
        params = MongoDBHelpers.convertObjectIdInData(params, languageObjectIdKeys);

        if (params._id) {
            filters = {
                ...filters,
                _id: params._id
            }
        }

        return await languageModel.find(filters, {}).lean().exec();
    },
    async insert(params: InsertLanguageDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, languageObjectIdKeys);

        return await languageModel.create(params)
    }
};