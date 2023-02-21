import * as mongoose from "mongoose";
import postModel from "../models/post.model";
import {
    DeletePostParamDocument,
    InsertPostParamDocument,
    PostDocument, SelectPostCountParamDocument,
    SelectPostParamDocument, SelectPostResultDocument,
    UpdatePostParamDocument, UpdatePostRankParamDocument, UpdatePostStatusIdParamDocument, UpdatePostViewParamDocument
} from "../types/services/post";
import MongoDBHelpers from "../library/mongodb/helpers";
import {SelectPostTermResultDocument} from "../types/services/postTerm";
import Variable from "../library/variable";
import {Config} from "../config";
import {SelectComponentResultDocument} from "../types/services/component";
import postObjectIdKeys from "../constants/objectIdKeys/post.objectIdKeys";
import {StatusId} from "../constants/status";
import {PostTermTypeId} from "../constants/postTermTypes";
import {PostTypeId} from "../constants/postTypes";

export default {
    async select(params: SelectPostParamDocument): Promise<SelectPostResultDocument[]> {
        let filters: mongoose.FilterQuery<PostDocument> = {}
        params = MongoDBHelpers.convertObjectIdInData(params, [...postObjectIdKeys, "ignorePostId"]);
        let defaultLangId = MongoDBHelpers.createObjectId(Config.defaultLangId);

        if (params._id) filters = {
            ...filters,
            _id: params._id
        }
        if (params.url) filters = {
            ...filters,
            "contents.url": params.url
        }
        if (params.title) filters = {
            ...filters,
            "contents.title": { $regex: new RegExp(params.title, "i") }
        }
        if (params.typeId) {
            filters = {
                ...filters,
                typeId: Array.isArray(params.typeId) ? {$in: params.typeId} : params.typeId
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
                _id: {$nin: params.ignorePostId}
            }
        }

        let query = postModel.find(filters).populate<{ terms: SelectPostResultDocument["terms"] }>({
            path: "terms",
            select: "_id typeId contents.title contents.langId contents.url contents.image",
            match: {
                typeId: {$in: [PostTermTypeId.Category, PostTermTypeId.Tag]},
                statusId: StatusId.Active,
                ...(params.typeId ? {postTypeId: Array.isArray(params.typeId) ? {$in: params.typeId} : params.typeId} : {})
            },
            transform: (doc: SelectPostTermResultDocument) => {
                if (doc) {
                    if (Array.isArray(doc.contents)) {
                        doc.contents = doc.contents.findSingle("langId", params.langId) ?? doc.contents.findSingle("langId", defaultLangId);
                    }
                }
                return doc;
            }
        }).populate<{ eCommerce: SelectPostResultDocument["eCommerce"]}>({
            path: [
                "eCommerce.attributes.attributeId",
                "eCommerce.attributes.variations",
                "eCommerce.variations.selectedVariations.attributeId",
                "eCommerce.variations.selectedVariations.variationId",
                "eCommerce.variationDefaults.attributeId",
                "eCommerce.variationDefaults.variationId",
            ].join(" "),
            select: "_id typeId contents.title contents.langId contents.url contents.image",
            match: {
                typeId: {$in: [PostTermTypeId.Attributes, PostTermTypeId.Variations]},
                statusId: StatusId.Active,
                postTypeId: PostTypeId.Product
            },
            transform: (doc: SelectPostTermResultDocument) => {
                if (doc) {
                    if (Array.isArray(doc.contents)) {
                        doc.contents = doc.contents.findSingle("langId", params.langId) ?? doc.contents.findSingle("langId", defaultLangId);
                    }
                }
                return doc;
            }
        }).populate<{ components: SelectPostResultDocument["components"] }>({
            path: "components",
            transform: (doc: SelectComponentResultDocument) => {
                if (doc) {
                    doc.types.map(docType => {
                        if (Array.isArray(docType.contents)) {
                            docType.contents = docType.contents.findSingle("langId", params.langId) ?? docType.contents.findSingle("langId", defaultLangId);
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
        }).populate<{ authorId: SelectPostResultDocument["authorId"], lastAuthorId: SelectPostResultDocument["lastAuthorId"] }>({
            path: [
                "authorId",
                "lastAuthorId"
            ].join(" "),
            select: "_id name email url"
        })

        if(params.isGeneral && params.page) {
            query.sort({createdAt: -1});
        }else {
            query.sort({isFixed: -1, rank: 1, createdAt: -1});
        }

        if(params.page) query.skip((params.count ?? 10) * (params.page > 0 ? params.page - 1 : 0));
        if (params.count) query.limit(params.count);

        return (await query.lean().exec()).map((doc: SelectPostResultDocument) => {
            let views = 0;

            if (Array.isArray(doc.contents)) {
                doc.alternates = doc.contents.map(content => ({
                    langId: content.langId,
                    title: content.title,
                    url: content.url
                }));

                for (const docContent of doc.contents) {
                    if (docContent.views) {
                        views += Number(docContent.views);
                    }
                }

                let docContent = doc.contents.findSingle("langId", params.langId);
                if (!docContent && !params.ignoreDefaultLanguage) {
                    docContent = doc.contents.findSingle("langId", defaultLangId);
                    if (docContent) {
                        docContent.views = 0;
                    }
                }

                if (docContent) {
                    doc.contents = docContent;
                    if (!params.getContents) {
                        delete doc.contents.content;
                    }
                }
            }

            if(doc.eCommerce){
                if(doc.eCommerce.variations){
                    for(let docECommerceVariation of doc.eCommerce.variations){
                        if(Array.isArray(docECommerceVariation.contents)){
                            let docEcommerceVariationContent = docECommerceVariation.contents.findSingle("langId", params.langId) ?? docECommerceVariation.contents.findSingle("langId", defaultLangId);
                            if (docEcommerceVariationContent) {
                                docECommerceVariation.contents = docEcommerceVariationContent;
                                if (!params.getContents) {
                                    delete docECommerceVariation.contents.content;
                                }
                            }
                        }
                    }
                }
            }

            doc.views = views;
            doc.components = doc.components?.filter(component => component);
            doc.terms = doc.terms?.filter(term => term);

            return doc;
        });
    },
    async selectCount(params: SelectPostCountParamDocument): Promise<number> {
        let filters: mongoose.FilterQuery<PostDocument> = {statusId: StatusId.Active}
        params = MongoDBHelpers.convertObjectIdInData(params, postObjectIdKeys);

        if (params.url) filters = {
            ...filters,
            "contents.url": params.url
        }
        if (params.title) filters = {
            ...filters,
            "contents.title": params.title
        }
        if (params.typeId) {
            filters = {
                ...filters,
                typeId: Array.isArray(params.typeId) ? {$in: params.typeId} : params.typeId
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
                _id: {$nin: params.ignorePostId}
            }
        }

        let query = postModel.find(filters);

        return await query.count().exec();
    },
    async insert(params: InsertPostParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, postObjectIdKeys);

        return await postModel.create(params);
    },
    async update(params: UpdatePostParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, postObjectIdKeys);

        let filters: mongoose.FilterQuery<PostDocument> = {}

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

        return await Promise.all((await postModel.find(filters).exec()).map(async doc => {
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

            await doc.save();

            return {
                _id: doc._id,
                pageTypeId: doc.pageTypeId,
                lastAuthorId: doc.lastAuthorId
            }
        }));
    },
    async updateStatus(params: UpdatePostStatusIdParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, postObjectIdKeys);

        let filters: mongoose.FilterQuery<PostDocument> = {}

        if(params._id) {
            filters = {
                ...filters,
                _id: Array.isArray(params._id) ? {$in: params._id} : params._id
            }
        }

        if (params.typeId) {
            filters = {
                ...filters,
                typeId: params.typeId
            }
        }

        return await Promise.all((await postModel.find(filters).exec()).map(async doc => {
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
    async updateRank(params: UpdatePostRankParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, postObjectIdKeys);

        let filters: mongoose.FilterQuery<PostDocument> = {}

        if(params._id) {
            filters = {
                ...filters,
                _id: Array.isArray(params._id) ? {$in: params._id} : params._id
            }
        }

        if (params.typeId) {
            filters = {
                ...filters,
                typeId: params.typeId
            }
        }

        return await Promise.all((await postModel.find(filters).exec()).map(async doc => {
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
    async updateView(params: UpdatePostViewParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, postObjectIdKeys);

        let filters: mongoose.FilterQuery<PostDocument> = {}

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

        return await Promise.all((await postModel.find(filters).exec()).map(async doc => {
            let docContent = doc.contents.findSingle("langId", params.langId);
            if (docContent) {
                if (docContent.views) {
                    docContent.views = Number(docContent.views) + 1;
                } else {
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
    async delete(params: DeletePostParamDocument) {
        let filters: mongoose.FilterQuery<PostDocument> = {}
        params = MongoDBHelpers.convertObjectIdInData(params, postObjectIdKeys);

        filters = {
            ...filters,
            _id: Array.isArray(params._id) ? {$in: params._id} : params._id
        }

        if (params.typeId) {
            filters = {
                ...filters,
                typeId: params.typeId
            }
        }

        return await Promise.all(((await postModel.find(filters).exec()).map(async doc => {
            await doc.remove();
            return {
                _id: doc._id,
            };
        })));
    }
};