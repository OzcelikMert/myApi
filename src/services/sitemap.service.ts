import * as mongoose from "mongoose";
import postModel from "../models/post.model";
import {
    PostDocument,
} from "../types/services/post";
import MongoDBHelpers from "../library/mongodb/helpers";
import postObjectIdKeys from "../constants/objectIdKeys/post.objectIdKeys";
import {StatusId} from "../constants/status";
import postTermObjectIdKeys from "../constants/objectIdKeys/postTerm.objectIdKeys";
import postTermModel from "../models/postTerm.model";

export const sitemapLimit = 500;

export default {
    async selectPost(params: { typeId: number, page?: number }) {
        let filters: mongoose.FilterQuery<PostDocument> = {statusId: StatusId.Active}
        params = MongoDBHelpers.convertObjectIdInData(params, postObjectIdKeys);

        if (params.typeId) {
            filters = {
                ...filters,
                typeId: params.typeId
            }
        }

        let query = postModel.find(filters);

        query.sort({createdAt: -1});

        query.skip(sitemapLimit * (params.page && params.page > 0 ? params.page - 1 : 0));
        query.limit(sitemapLimit);

        return (await query.lean().exec()).map(doc => {
            return {
                updatedAt: doc.updatedAt,
                createdAt: doc.createdAt,
                typeId: doc.typeId,
                pageTypeId: doc.pageTypeId,
                contents: doc.contents.map(content => ({
                    langId: content.langId,
                    title: content.title,
                    url: content.url
                }))
            };
        });
    },
    async selectPostCountForType(params: { typeId?: number[] }) {
        let filters: mongoose.FilterQuery<PostDocument> = {statusId: StatusId.Active}
        params = MongoDBHelpers.convertObjectIdInData(params, postObjectIdKeys);

        if (params.typeId) {
            filters = {
                ...filters,
                typeId: {$in: params.typeId}
            }
        }

        let query = postModel.aggregate([
            {
                $match: filters
            },
            {
                $group: {
                    _id: "$typeId",
                    total: {$sum: 1}
                }
            },
        ]);

        query.sort({_id: 1});

        return (await query.exec()).map(doc => {
            return {
                typeId: doc._id,
                total: doc.total
            }
        });
    },
    async selectPostTerm(params: { typeId: number, postTypeId: number, page?: number }) {
        let filters: mongoose.FilterQuery<PostDocument> = {statusId: StatusId.Active}
        params = MongoDBHelpers.convertObjectIdInData(params, postTermObjectIdKeys);

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


        let query = postTermModel.find(filters);

        query.sort({createdAt: -1});

        query.skip(sitemapLimit * (params.page && params.page > 0 ? params.page - 1 : 0));
        query.limit(sitemapLimit);

        return (await query.lean().exec()).map(doc => {
            return {
                updatedAt: doc.updatedAt,
                createdAt: doc.createdAt,
                typeId: doc.typeId,
                postTypeId: doc.postTypeId,
                contents: doc.contents.map(content => ({
                    langId: content.langId,
                    title: content.title,
                    url: content.url
                }))
            };
        });
    },
    async selectPostTermCountForType(params: { typeId?: number[] }) {
        let filters: mongoose.FilterQuery<PostDocument> = {statusId: StatusId.Active}
        params = MongoDBHelpers.convertObjectIdInData(params, postObjectIdKeys);

        if (params.typeId) {
            filters = {
                ...filters,
                typeId: {$in: params.typeId}
            }
        }

        let query = postTermModel.aggregate([
            {
                $match: filters
            },
            {
                $group: {
                    _id: {postTypeId: "$postTypeId", typeId: "$typeId"},
                    total: {$sum: 1}
                }
            }
        ]);

        query.sort({_id: 1});

        return (await query.exec()).map(doc => {
            return {
                typeId: doc._id.typeId,
                postTypeId: doc._id.postTypeId,
                total: doc.total
            }
        });
    },
};