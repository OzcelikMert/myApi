import * as mongoose from "mongoose";
import postTermModel from "../models/postTerm.model";
import {
    DeletePostTermParamDocument,
    InsertPostTermParamDocument,
    PostTermDocument,
    SelectPostTermParamDocument, SelectPostTermResultDocument,
    UpdatePostTermParamDocument, UpdatePostTermRankParamDocument, UpdatePostTermStatusIdParamDocument
} from "../types/services/postTerm";
import MongoDBHelpers from "../library/mongodb/helpers";
import Variable from "../library/variable";
import {Config} from "../config";
import postTermObjectIdKeys from "../constants/objectIdKeys/postTerm.objectIdKeys";
import postModel from "../models/post.model";
import {PostTermTypeId} from "../constants/postTermTypes";

export default {
    async select(params: SelectPostTermParamDocument): Promise<SelectPostTermResultDocument[]> {
        let filters: mongoose.FilterQuery<PostTermDocument> = {}
        params = MongoDBHelpers.convertObjectIdInData(params, [...postTermObjectIdKeys, "ignoreTermId"]);
        let defaultLangId = MongoDBHelpers.createObjectId(Config.defaultLangId);

        if (params._id) filters = {
            ...filters,
            _id: params._id
        }
        if (params.url) filters = {
            ...filters,
            "contents.url": params.url
        }
        if (params.typeId) filters = {
            ...filters,
            typeId: params.typeId
        }
        if (params.statusId) filters = {
            ...filters,
            statusId: params.statusId
        }
        if (params.postTypeId) filters = {
            ...filters,
            postTypeId: params.postTypeId
        }
        if (params.ignoreTermId) {
            filters = {
                ...filters,
                _id: {$nin: params.ignoreTermId}
            }
        }

        let query = postTermModel.find(filters, {}).populate<{ mainId: SelectPostTermResultDocument["mainId"] }>({
            path: "mainId",
            select: "_id contents.title contents.url contents.langId",
            transform: (doc: SelectPostTermResultDocument) => {
                if (doc) {
                    if (Array.isArray(doc.contents)) {
                        doc.contents = doc.contents.findSingle("langId", params.langId) ?? doc.contents.findSingle("langId", defaultLangId);
                    }
                }
                return doc;
            }
        }).populate<{ authorId: SelectPostTermResultDocument["authorId"] }>({
            path: "authorId",
            select: "_id name email url"
        }).populate<{ lastAuthorId: SelectPostTermResultDocument["lastAuthorId"] }>({
            path: "lastAuthorId",
            select: "_id name email url"
        })

        if (params.count) query.limit(params.count);

        query.sort({rank: 1, createdAt: -1});

        return Promise.all((await query.lean().exec()).map(async ( doc: SelectPostTermResultDocument) => {
            if (Array.isArray(doc.contents)) {
                doc.alternates = doc.contents.map(content => ({
                    langId: content.langId,
                    title: content.title,
                    url: content.url
                }));

                let docContent = doc.contents.findSingle("langId", params.langId);
                if (!docContent && !params.ignoreDefaultLanguage) {
                    docContent = doc.contents.findSingle("langId", defaultLangId);
                }

                if (docContent) {
                    doc.contents = docContent;
                }
            }

            if(params.withPostCount && [PostTermTypeId.Category].includes(doc.typeId)){
                doc.postCount = (await postModel.find({typeId: doc.postTypeId, terms: { $in: [doc._id]}}).count().exec())
            }

            return doc;
        }))
    },
    async insert(params: InsertPostTermParamDocument) {
        params = MongoDBHelpers.convertObjectIdInData(params, postTermObjectIdKeys);

        if (Variable.isEmpty(params.mainId)) {
            delete params.mainId;
        }

        return await postTermModel.create(params)
    },
    async update(params: UpdatePostTermParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, postTermObjectIdKeys);

        let filters: mongoose.FilterQuery<PostTermDocument> = {}

        if (params._id) {
            filters = {
                _id: params._id
            };
        }
        if (params.typeId) {
            filters = {
                ...filters,
                typeId: params.typeId
            }
        }
        if (params.postTypeId) filters = {
            ...filters,
            postTypeId: params.postTypeId
        }

        return await Promise.all((await postTermModel.find(filters).exec()).map(async doc => {
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
            };
        }));
    },
    async updateStatus(params: UpdatePostTermStatusIdParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, postTermObjectIdKeys);

        let filters: mongoose.FilterQuery<PostTermDocument> = {}

        if(params._id){
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

        if (params.typeId) {
            filters = {
                ...filters,
                typeId: params.typeId
            }
        }
        if (params.postTypeId) filters = {
            ...filters,
            postTypeId: params.postTypeId
        }

        return await Promise.all((await postTermModel.find(filters).exec()).map(async doc => {
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
    async updateRank(params: UpdatePostTermRankParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, postTermObjectIdKeys);

        let filters: mongoose.FilterQuery<PostTermDocument> = {}

        if(params._id){
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

        if (params.typeId) {
            filters = {
                ...filters,
                typeId: params.typeId
            }
        }
        if (params.postTypeId) filters = {
            ...filters,
            postTypeId: params.postTypeId
        }

        return await Promise.all((await postTermModel.find(filters).exec()).map(async doc => {
            doc.rank = params.rank;
            doc.lastAuthorId = params.lastAuthorId;

            await doc.save();

            return {
                _id: doc._id,
                rank: doc.rank,
                lastAuthorId: doc.lastAuthorId
            };
        }));
    },
    async delete(params: DeletePostTermParamDocument) {
        let filters: mongoose.FilterQuery<PostTermDocument> = {}
        params = MongoDBHelpers.convertObjectIdInData(params, postTermObjectIdKeys);

        if (Array.isArray(params._id)) {
            filters = {
                _id: {$in: params._id}
            }
        } else {
            filters = {
                _id: params._id
            };
        }

        if (params.typeId) {
            filters = {
                ...filters,
                typeId: params.typeId
            }
        }

        if (params.postTypeId) {
            filters = {
                ...filters,
                postTypeId: params.postTypeId
            }
        }

        return await Promise.all((await postTermModel.find(filters).exec()).map(async doc => {
            await doc.remove();
            return {
                _id: doc._id,
            };
        }));
    }
};