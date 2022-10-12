import * as mongoose from "mongoose";
import viewModel from "../models/view.model";
import {
    DeleteViewParamDocument,
    InsertViewParamDocument, SelectTotalViewResultDocument,
    SelectViewParamDocument, SelectViewResultDocument,
    ViewDocument,
    SelectTotalWithViewResultDocument
} from "../types/services/view";
import MongoDBHelpers from "../library/mongodb/helpers";

export default {
    async select(params: SelectViewParamDocument): Promise<SelectViewResultDocument[]> {
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
            languageId: MongoDBHelpers.createObjectId(params.langId)
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
    async selectTotal(params: SelectViewParamDocument): Promise<SelectTotalViewResultDocument> {
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
    async selectTotalWithDate(params: SelectViewParamDocument): Promise<SelectTotalWithViewResultDocument[]> {
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
    async selectTotalWithCountry(params: SelectViewParamDocument): Promise<SelectTotalWithViewResultDocument[]> {
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
            ...params,
            languageId: MongoDBHelpers.createObjectId(params.languageId)
        })
    },
    async delete(params: DeleteViewParamDocument) {
        return await viewModel.deleteMany({
            createdAt: {$lt: params.dateEnd}
        });
    }
};