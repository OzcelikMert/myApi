import * as mongoose from "mongoose";
import postModel from "../models/post.model";
import {
    DeletePostParamDocument,
    InsertPostParamDocument,
    PostDocument,
    SelectPostParamDocument, SelectPostResultDocument,
    UpdatePostParamDocument, UpdatePostStatusIdParamDocument
} from "../types/services/post";
import MongoDBHelpers from "../library/mongodb/helpers";
import {SelectPostTermResultDocument} from "../types/services/postTerm";
import Variable from "../library/variable";
import {Config} from "../config";
import {SelectComponentResultDocument} from "../types/services/component";

export default {
    async select(params: SelectPostParamDocument): Promise<SelectPostResultDocument[]> {
        let filters: mongoose.FilterQuery<PostDocument> = {}

        if (params.postId) filters = {
            ...filters,
            _id: MongoDBHelpers.createObjectId(params.postId)
        }
        if (params.url) filters = {
            ...filters,
            "contents.url": params.url
        }
        if (params.typeId) {
            if (Array.isArray(params.typeId)) {
                filters = {
                    ...filters,
                    typeId: {$in: params.typeId}
                }
            } else {
                filters = {
                    ...filters,
                    typeId: params.typeId
                }
            }
        }
        if (params.pageTypeId) filters = {
            ...filters,
            pageTypeId: params.pageTypeId
        }
        if (params.statusId) filters = {
            ...filters,
            statusId: params.statusId
        }
        if (params.ignorePostId) {
            filters = {
                ...filters,
                _id: {$nin: MongoDBHelpers.createObjectIdArray(params.ignorePostId)}
            }
        }

        let query = postModel.find(filters).populate<{ mainId: SelectPostResultDocument["mainId"] }>({
            path: "mainId",
            select: "_id contents.title contents.url contents.langId",
            transform: (doc: SelectPostResultDocument) => {
                if(doc){
                    if (Array.isArray(doc.contents)) {
                        doc.contents = doc.contents.findSingle("langId", params.langId) ?? doc.contents.findSingle("langId", Config.defaultLangId);
                        if (doc.contents) {
                            if (!params.getContents) {
                                delete doc.contents.content;
                            }
                        }
                    }
                    return doc;
                }
            }
        }).populate<{ terms: SelectPostResultDocument["terms"] }>({
            path: "terms",
            select: "_id typeId contents.title contents.langId",
            transform: (doc: SelectPostTermResultDocument) => {
                if(doc) {
                    if (Array.isArray(doc.contents)) {
                        doc.contents = doc.contents.findSingle("langId", params.langId) ?? doc.contents.findSingle("langId", Config.defaultLangId);
                    }
                }
                return doc;
            }
        }).populate<{ components: SelectPostResultDocument["components"] }>({
            path: "components",
            transform: (doc: SelectComponentResultDocument) => {
                if(doc){
                    doc.types.map(docType => {
                        if (Array.isArray(docType.contents)) {
                            docType.contents = docType.contents.findSingle("langId", params.langId) ?? docType.contents.findSingle("langId", Config.defaultLangId);
                            if (docType.contents) {
                                if (!params.getContents) {
                                    delete docType.contents.content;
                                }
                            }
                        }
                    })
                }
                return doc;
            }
        }).populate<{ authorId: SelectPostResultDocument["authorId"] }>({
            path: "authorId",
            select: "_id name email url"
        }).populate<{ lastAuthorId: SelectPostResultDocument["lastAuthorId"] }>({
            path: "lastAuthorId",
            select: "_id name email url"
        });

        if (params.maxCount) query.limit(params.maxCount);

        return (await query.lean().exec())?.map((doc: SelectPostResultDocument) => {
            if (Array.isArray(doc.contents)) {
                doc.contents = doc.contents.findSingle("langId", params.langId) ?? doc.contents.findSingle("langId", Config.defaultLangId);
                if (doc.contents) {
                    if (!params.getContents) {
                        delete doc.contents.content;
                    }
                }
            }

            doc.components = doc.components?.filter(component => component);
            doc.terms = doc.terms?.filter(term => term);

            return doc;
        });
    },
    async insert(params: InsertPostParamDocument) {
        if(Variable.isEmpty(params.mainId)){
            delete params.mainId;
        }

        if(params.contents.content) params.contents.content = params.contents.content.encode();

        return await postModel.create({
            ...params,
            terms: MongoDBHelpers.createObjectIdArray(params.terms),
            ...(params.components ? {components: MongoDBHelpers.createObjectIdArray(params.components)} : {}),
            authorId: MongoDBHelpers.createObjectId(params.authorId),
            lastAuthorId: MongoDBHelpers.createObjectId(params.authorId),
            ...(params.mainId ? {mainId: MongoDBHelpers.createObjectId(params.mainId)} : {}),
            contents: [
                {
                    ...params.contents,
                    langId: MongoDBHelpers.createObjectId(params.contents.langId)
                }
            ],
            ...(params.sitemap ? {siteMap: params.sitemap} : {}),
        });
    },
    async update(params: UpdatePostParamDocument) {
        let filters: mongoose.FilterQuery<PostDocument> = {}

        if(Variable.isEmpty(params.mainId)){
            delete params.mainId;
        }

        if (params.postId) {
            filters = {
                _id: MongoDBHelpers.createObjectId(params.postId)
            };
        }
        if (params.typeId) {
            filters = {
                ...filters,
                typeId: params.typeId
            }
        }

        delete params.postId;
        delete params.typeId;
        return await Promise.all((await postModel.find(filters).exec()).map(async doc => {
            if (params.contents) {
                if(params.contents.content) params.contents.content = params.contents.content.encode();

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
        }));
    },
    async updateStatus(params: UpdatePostStatusIdParamDocument): Promise<PostDocument[]> {
        let filters: mongoose.FilterQuery<PostDocument> = {}

        if (Array.isArray(params.postId)) {
            filters = {
                _id: {$in: MongoDBHelpers.createObjectIdArray(params.postId)}
            }
        } else {
            filters = {
                _id: MongoDBHelpers.createObjectId(params.postId)
            };
        }
        if (params.typeId) {
            filters = {
                ...filters,
                typeId: params.typeId
            }
        }

        delete params.postId;
        delete params.typeId;
        return await Promise.all((await postModel.find(filters))?.map(async doc => {
            doc = Object.assign(doc, {
                ...params,
                statusId: params.statusId,
                lastAuthorId: MongoDBHelpers.createObjectId(params.lastAuthorId)
            });

            return Object.assign(await doc.save(), {contents: undefined});
        }));
    },
    async delete(params: DeletePostParamDocument) {
        let filters: mongoose.FilterQuery<PostDocument> = {}

        if (Array.isArray(params.postId)) {
            filters = {
                _id: {$in: MongoDBHelpers.createObjectIdArray(params.postId)}
            }
        } else {
            filters = {
                _id: MongoDBHelpers.createObjectId(params.postId)
            };
        }

        if (params.typeId) {
            filters = {
                ...filters,
                typeId: params.typeId
            }
        }

        return await Promise.all(((await postModel.find(filters).exec()).map(async doc => {
            await doc.remove();
            return doc;
        })));
    }
};