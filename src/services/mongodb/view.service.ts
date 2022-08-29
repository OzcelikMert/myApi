import * as mongoose from "mongoose";
import V, {DateMask} from "../../library/variable";
import viewModel, {
    InsertViewParamDocument,
    SelectViewParamDocument,
    ViewDocument,
    ViewTotalWithDocument
} from "../../model/view.model";
import {ViewTotalDocument} from "../../types/services/view";

export default {
    async select(params: SelectViewParamDocument): Promise<ViewDocument[]> {
        params = V.clearAllData(params);

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
            createdAt: new Date(params.date)
        }
        if (params.dateStart) {
            filters = {
                ...filters,
                createdAt: {
                    $gt: new Date(params.dateStart),
                    ...((params.dateEnd) ? {$lt: new Date(params.dateEnd)} : {})
                }
            }
        }

        return await viewModel.find(filters, {}, {lean: true});
    },
    async selectTotal(params: SelectViewParamDocument): Promise<ViewTotalDocument> {
        params = V.clearAllData(params);

        let filters: mongoose.FilterQuery<ViewDocument> = {}

        if (params.dateStart) {
            filters = {
                ...filters,
                createdAt: {
                    $gt: new Date(params.dateStart),
                    ...((params.dateEnd) ? {$lt: new Date(params.dateEnd)} : {})
                }
            }
        }

        return {
            total: (await viewModel.countDocuments(filters)) || 0
        };
    },
    async selectTotalWithDate(params: SelectViewParamDocument): Promise<ViewTotalWithDocument[]> {
        params = V.clearAllData(params);

        let filters: mongoose.FilterQuery<ViewDocument> = {}

        if (params.dateStart) {
            filters = {
                ...filters,

                createdAt: {
                    $gt: new Date(params.dateStart),
                    ...((params.dateEnd) ? {$lt: new Date(params.dateEnd)} : {})
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
        params = V.clearAllData(params);

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
        params = V.clearAllData(params);

        return await viewModel.create({
            url: params.url,
            ip: params.ip,
            languageId: params.languageId,
            city: params.city || "",
            country: params.country || "",
            region: params.region || ""
        })
    }
};