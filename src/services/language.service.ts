import * as mongoose from "mongoose";
import languageModel from "../models/language.model";
import {
    LanguageDocument,
    SelectLanguageResultDocument,
    SelectLanguageParamDocument,
    UpdateLanguageParamDocument,
    InsertLanguageParamDocument,
    UpdateLanguageRankParamDocument
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

        if (params.statusId) {
            filters = {
                ...filters,
                statusId: params.statusId
            }
        }

        let query = languageModel.find(filters, {});

        query.sort({rank: 1, createdAt: -1});

        return await query.lean().exec();
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
    },
    async updateRank(params: UpdateLanguageRankParamDocument) {
        let filters: mongoose.FilterQuery<LanguageDocument> = {}
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, languageObjectIdKeys);

        if(params._id) {
            if (Array.isArray(params._id)) {
                filters = {
                    _id: {$in: params._id}
                }
            } else {
                filters = {
                    _id: params._id
                };
            }
        }

        return await Promise.all((await languageModel.find(filters).exec()).map(async doc => {
            doc.rank = params.rank;

            await doc.save();

            return {
                _id: doc._id,
                rank: doc.rank
            };
        }));
    }
};