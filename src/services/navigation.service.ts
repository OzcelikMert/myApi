import * as mongoose from "mongoose";
import MongoDBHelpers from "../library/mongodb/helpers";
import Variable from "../library/variable";
import {Config} from "../config";
import navigationObjectIdKeys from "../constants/objectIdKeys/navigation.objectIdKeys";
import {
    DeleteNavigationParamDocument,
    InsertNavigationParamDocument,
    NavigationDocument,
    SelectNavigationParamDocument,
    SelectNavigationResultDocument, UpdateNavigationParamDocument, UpdateNavigationStatusIdParamDocument
} from "../types/services/navigation";
import navigationModel from "../models/navigation.model";

export default {
    async select(params: SelectNavigationParamDocument): Promise<SelectNavigationResultDocument[]> {
        let filters: mongoose.FilterQuery<NavigationDocument> = {}
        params = MongoDBHelpers.convertObjectIdInData(params, navigationObjectIdKeys);
        let defaultLangId = MongoDBHelpers.createObjectId(Config.defaultLangId);

        if (params._id) filters = {
            ...filters,
            _id: params._id
        }
        if (params.url) filters = {
            ...filters,
            "contents.url": params.url
        }
        if (params.statusId) filters = {
            ...filters,
            statusId: params.statusId
        }

        let query = navigationModel.find(filters).populate<{ mainId: SelectNavigationResultDocument["mainId"] }>({
            path: "mainId",
            select: "_id contents.title contents.url contents.langId",
            transform: (doc: SelectNavigationResultDocument) => {
                if (doc) {
                    if (Array.isArray(doc.contents)) {
                        doc.contents = doc.contents.findSingle("langId", params.langId) ?? doc.contents.findSingle("langId", defaultLangId);
                    }
                    return doc;
                }
            }
        }).populate<{ authorId: SelectNavigationResultDocument["authorId"] }>({
            path: "authorId",
            select: "_id name email url"
        }).populate<{ lastAuthorId: SelectNavigationResultDocument["lastAuthorId"] }>({
            path: "lastAuthorId",
            select: "_id name email url"
        });

        return (await query.lean().exec()).map((doc: SelectNavigationResultDocument) => {
            if (Array.isArray(doc.contents)) {
                let docContent = doc.contents.findSingle("langId", params.langId);
                if (!docContent) {
                    docContent = doc.contents.findSingle("langId", defaultLangId);
                }

                if (docContent) {
                    doc.contents = docContent;
                }
            }

            return doc;
        });
    },
    async insert(params: InsertNavigationParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, navigationObjectIdKeys);

        if (Variable.isEmpty(params.mainId)) {
            delete params.mainId;
        }

        return await navigationModel.create(params);
    },
    async update(params: UpdateNavigationParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, navigationObjectIdKeys);

        let filters: mongoose.FilterQuery<NavigationDocument> = {}

        if (params._id) {
            filters = {
                _id: params._id
            };
        }

        return await Promise.all((await navigationModel.find(filters).exec()).map(async doc => {
            if (params.contents) {
                let docContent = doc.contents.findSingle("langId", params.contents.langId);
                if (docContent) {
                    docContent = Object.assign(docContent, params.contents);
                } else {
                    doc.contents.push(params.contents)
                }
                delete params.contents;
            }

            doc = Object.assign(doc, params);

            if (Variable.isEmpty(params.mainId)) {
                doc.mainId = undefined;
            }

            if(params.mainId){
                doc.mainId = params.mainId;
            }

            await doc.save();

            return {
                _id: doc._id,
                lastAuthorId: doc.lastAuthorId
            }
        }));
    },
    async updateStatus(params: UpdateNavigationStatusIdParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, navigationObjectIdKeys);

        let filters: mongoose.FilterQuery<NavigationDocument> = {}

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

        return await Promise.all((await navigationModel.find(filters).exec()).map(async doc => {
            doc.statusId = params.statusId;
            doc.lastAuthorId = params.lastAuthorId;

            await doc.save();

            return {
                _id: doc._id,
                statusId: doc.statusId,
                lastAuthorId: doc.lastAuthorId
            };
        }));
    },
    async delete(params: DeleteNavigationParamDocument) {
        params = MongoDBHelpers.convertObjectIdInData(params, navigationObjectIdKeys);

        let filters: mongoose.FilterQuery<NavigationDocument> = {}

        if (Array.isArray(params._id)) {
            filters = {
                _id: {$in: params._id}
            }
        } else {
            filters = {
                _id: params._id
            };
        }

        return await Promise.all(((await navigationModel.find(filters).exec()).map(async doc => {
            await doc.remove();
            return {
                _id: doc._id
            };
        })));
    }
};