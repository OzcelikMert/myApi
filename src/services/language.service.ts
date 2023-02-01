import * as mongoose from "mongoose";
import languageModel from "../models/language.model";
import {
    LanguageDocument,
    SelectLanguageResultDocument,
    SelectLanguageParamDocument, UpdateLanguageParamDocument, InsertLanguageParamDocument
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
    async insert(params: InsertLanguageParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, languageObjectIdKeys);

        return await languageModel.create(params)
    },
    async update(params: UpdateLanguageParamDocument) {
        let filters: mongoose.FilterQuery<LanguageDocument> = {}
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, languageObjectIdKeys);

        if (params._id) {
            filters = {
                _id: params._id
            };
        }

        return await Promise.all((await languageModel.find(filters).exec()).map(async doc => {
            doc = Object.assign(doc, params);

            await doc.save();

            return {
                ...params,
                _id: doc._id,
            };
        }));
    }
};