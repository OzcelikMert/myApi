import * as mongoose from "mongoose";
import viewModel from "../model/view.model";
import {
    DeleteViewParamDocument,
    InsertViewParamDocument,
    SelectViewParamDocument,
    ViewDocument, ViewTotalDocument,
    ViewTotalWithDocument
} from "../types/services/view";
import postModel from "../model/post.model";

export default {
    async select(params: SelectViewParamDocument): Promise<ViewDocument[]> {
        let filters: mongoose.FilterQuery<ViewDocument> = {}

        if (params.ip) filters = {
            ...filters,
            ip: params.ip
        }
        if (params.url) filters = {
            ...filters,
            url: params.url
        }
        if (params.langId) filters = {
            ...filters,
            languageId: params.langId
        }
        if (params.city) filters = {
            ...filters,
            city: params.city
        }
        if (params.country) filters = {
            ...filters,
            country: params.country
        }
        if (params.region) filters = {
            ...filters,
            region: params.region
        }
        if (params.date) filters = {
            ...filters,
            createdAt: params.date
        }
        if (params.dateStart) {
            filters = {
                ...filters,
                createdAt: {
                    $gt: params.dateStart,
                    ...((params.dateEnd) ? {$lt: params.dateEnd} : {})
                }
            }
        }

        return await viewModel.find(filters, {}, {lean: true});
    },
    async selectTotal(params: SelectViewParamDocument): Promise<ViewTotalDocument> {
        let filters: mongoose.FilterQuery<ViewDocument> = {}

        if (params.dateStart) {
            filters = {
                ...filters,
                createdAt: {
                    $gt: params.dateStart,
                    ...((params.dateEnd) ? {$lt: params.dateEnd} : {})
                }
            }
        }

        return {
            total: (await viewModel.countDocuments(filters)) || 0
        };
    },
    async selectTotalWithDate(params: SelectViewParamDocument): Promise<ViewTotalWithDocument[]> {
        let filters: mongoose.FilterQuery<ViewDocument> = {}

        if (params.dateStart) {
            filters = {
                ...filters,

                createdAt: {
                    $gt: params.dateStart,
                    ...((params.dateEnd) ? {$lt: params.dateEnd} : {})
                }
            }
        }

        return await viewModel.aggregate([
            {
              $match: filters
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    total: { $sum: 1 }
                },
            }
        ]);
    },
    async selectTotalWithCountry(params: SelectViewParamDocument): Promise<ViewTotalWithDocument[]> {
        let filters: mongoose.FilterQuery<ViewDocument> = {}

        if (params.dateStart) {
            filters = {
                ...filters,
                country: params.country
            }
        }

        return await viewModel.aggregate([
            {
                $match: filters
            },
            {
                $group: {
                    _id: "$country",
                    total: { $sum: 1 }
                },
            }
        ]);
    },
    async insert(params: InsertViewParamDocument) {
        return await viewModel.create({
            ...params
        })
    },
    async delete(params: DeleteViewParamDocument) {
        return await postModel.deleteMany({
            createdAt: {$lt: params.dateEnd}
        });
    }
};