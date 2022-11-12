import * as mongoose from "mongoose";
import postTermModel from "../models/postTerm.model";
import {
    DeletePostTermParamDocument,
    InsertPostTermParamDocument,
    PostTermDocument,
    SelectPostTermParamDocument, SelectPostTermResultDocument,
    UpdatePostTermParamDocument, UpdatePostTermStatusIdParamDocument, UpdatePostTermViewParamDocument
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

        return (await query.lean().exec()).map((doc: SelectPostTermResultDocument) => {
            let views = 0;

            if (Array.isArray(doc.contents)) {
                doc.alternates = doc.contents.map(content => ({
                    langId: content.langId,
                    title: content.title,
                    url: content.url
                }));

                for (const docContent of doc.contents) {
                    if(docContent.views){
                        views += Number(docContent.views);
                    }
                }
                let docContent = doc.contents.findSingle("langId", params.langId);
                if(!docContent){
                    docContent = doc.contents.findSingle("langId", Config.defaultLangId);
                    if(docContent){
                        docContent.views = 0;
                    }
                }

                if (docContent) {
                    doc.contents = docContent;
                }
            }

            doc.views = views;

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
            ...(params.sitemap ? {siteMap: params.sitemap} : {}),
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
        return await Promise.all((await postTermModel.find(filters).exec()).map(async doc => {
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

            await doc.save();
            doc.contents = [];
            return doc;
        }));
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
        return await Promise.all((await postTermModel.find(filters).exec()).map(async doc => {
            doc = Object.assign(doc, {
                ...params,
                statusId: params.statusId,
                lastAuthorId: MongoDBHelpers.createObjectId(params.lastAuthorId)
            });

            await doc.save();
            doc.contents = [];
            return doc;
        }));
    },
    async updateView(params: UpdatePostTermViewParamDocument) {
        let filters: mongoose.FilterQuery<PostTermDocument> = {}

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
        return await Promise.all((await postTermModel.find(filters).exec()).map(async doc => {
            let docContent = doc.contents.findSingle("langId", params.langId);
            if (docContent) {
                if(docContent.views){
                    docContent.views = Number(docContent.views) + 1;
                }else {
                    docContent.views = 1;
                }

                await doc.save();
            }

            return {
                _id: doc._id,
                views: docContent?.views
            };
        }));
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
            doc.contents = [];
            return doc;
        }));
    }
};