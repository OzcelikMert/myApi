import * as mongoose from "mongoose";
import postTermModel from "../models/postTerm.model";
import {
    DeletePostTermParamDocument,
    InsertPostTermParamDocument,
    PostTermDocument,
    SelectPostTermParamDocument, SelectPostTermResultDocument,
    UpdatePostTermParamDocument, UpdatePostTermStatusIdParamDocument
} from "../types/services/postTerm";
import MongoDBHelpers from "../library/mongodb/helpers";
import Variable from "../library/variable";
import {Config} from "../config";

export default {
    async select(params: SelectPostTermParamDocument): Promise<SelectPostTermResultDocument[]> {
        let filters: mongoose.FilterQuery<PostTermDocument> = {}

        if (params.termId) filters = {
            ...filters,
            _id: MongoDBHelpers.createObjectId(params.termId)
        }
        if (params.url) filters = {
            ...filters,
            "contents.langId": MongoDBHelpers.createObjectId(params.langId),
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
                _id: {$nin: MongoDBHelpers.createObjectIdArray(params.ignoreTermId)}
            }
        }

        let query = postTermModel.find(filters, {}).populate<{ mainId: SelectPostTermResultDocument["mainId"] }>({
            path: "mainId",
            select: "_id contents.title contents.url contents.langId",
            transform: (doc: SelectPostTermResultDocument) => {
                if(doc){
                    if (Array.isArray(doc.contents)) {
                        doc.contents = doc.contents.findSingle("langId", params.langId) ?? doc.contents.findSingle("langId", Config.defaultLangId);
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

        if (params.maxCount) query.limit(params.maxCount);

        return (await query.lean().exec())?.map((doc: SelectPostTermResultDocument) => {
            if (Array.isArray(doc.contents)) {
                doc.contents = doc.contents.findSingle("langId", params.langId) ?? doc.contents.findSingle("langId", Config.defaultLangId);
            }
            return doc;
        })
    },
    async insert(params: InsertPostTermParamDocument) {
        if(Variable.isEmpty(params.mainId)){
            delete params.mainId;
        }

        return await postTermModel.create({
            ...params,
            authorId: MongoDBHelpers.createObjectId(params.authorId),
            lastAuthorId: params.authorId,
            ...(params.mainId ? {mainId: MongoDBHelpers.createObjectId(params.mainId)} : {}),
            contents: [
                {
                    ...params.contents,
                    langId: MongoDBHelpers.createObjectId(params.contents.langId)
                }
            ],
            ...(params.siteMap ? {siteMap: params.siteMap} : {}),
        })
    },
    async update(params: UpdatePostTermParamDocument) {
        let filters: mongoose.FilterQuery<PostTermDocument> = {}

        if(Variable.isEmpty(params.mainId)){
            delete params.mainId;
        }

        if (params.termId) {
            filters = {
                _id: MongoDBHelpers.createObjectId(params.termId)
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

        delete params.termId;
        delete params.typeId;
        delete params.postTypeId;
        return (await postTermModel.find(filters))?.map(async doc => {
            if (params.contents) {
                let docContent = doc.contents.findSingle("langId", params.contents.langId);
                if (docContent) {
                    docContent = Object.assign(docContent, {
                        ...params.contents,
                        langId: MongoDBHelpers.createObjectId(params.contents.langId)
                    });
                } else {
                    doc.contents.push({
                        ...params.contents,
                        langId: MongoDBHelpers.createObjectId(params.contents.langId),
                    })
                }
                delete params.contents;
            }

            doc = Object.assign(doc, {
                ...params,
                ...(params.mainId ? {mainId: MongoDBHelpers.createObjectId(params.mainId)} : {}),
            });

            return await doc.save();
        });
    },
    async updateStatus(params: UpdatePostTermStatusIdParamDocument) {
        let filters: mongoose.FilterQuery<PostTermDocument> = {}

        if (Array.isArray(params.termId)) {
            filters = {
                _id: {$in: MongoDBHelpers.createObjectIdArray(params.termId)}
            }
        } else {
            filters = {
                _id: MongoDBHelpers.createObjectId(params.termId)
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

        delete params.termId;
        delete params.typeId;
        delete params.postTypeId;
        return (await postTermModel.find(filters))?.map(async doc => {
            doc = Object.assign(doc, {
                ...params,
                statusId: params.statusId,
                lastAuthorId: MongoDBHelpers.createObjectId(params.lastAuthorId)
            });

            return await doc.save();
        });
    },
    async delete(params: DeletePostTermParamDocument) {
        let filters: mongoose.FilterQuery<PostTermDocument> = {}

        if (Array.isArray(params.termId)) {
            filters = {
                _id: {$in: MongoDBHelpers.createObjectIdArray(params.termId)}
            }
        } else {
            filters = {
                _id: MongoDBHelpers.createObjectId(params.termId)
            };
        }

        return await postTermModel.deleteMany(filters);
    }
};