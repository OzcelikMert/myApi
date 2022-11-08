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
import Variable from "../library/variable";

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
        if (params.dateStart) {
            filters = {
                ...filters,
                createdAt: {
                    $gt: params.dateStart,
                    ...((params.dateEnd) ? {$lt: params.dateEnd} : {})
                }
            }
        }

        return await viewModel.find(filters, {}).lean().exec();
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
                    ipList: { $addToSet: "$ip" }
                }
            },
            {
                $unwind: "$ipList"
            },
            {
                $group: {
                    _id: "$_id",
                    total: { $sum: 1 }
                },
            }
        ]).sort({_id: 1}).exec();
    },
    async selectTotalWithCountry(params: SelectViewParamDocument): Promise<SelectTotalWithViewResultDocument[]> {
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
                    _id: "$country",
                    ipList: { $addToSet: "$ip" }
                },
            },
            {
                $unwind: "$ipList"
            },
            {
                $group: {
                    _id: "$_id",
                    total: { $sum: 1 }
                },
            }
        ]).exec();
    },
    async insert(params: InsertViewParamDocument) {
        return await viewModel.create({
            ...params,
            languageId: MongoDBHelpers.createObjectId(params.languageId)
        })
    },
    async delete(params: DeleteViewParamDocument) {
        let filters: mongoose.FilterQuery<ViewDocument> = {};

        if(params.dateEnd){
            filters = {
                ...filters,
                createdAt: {
                    $lt: params.dateEnd
                }
            }
        }

        return await Promise.all((await viewModel.find(filters).exec()).map(async doc => {
            await doc.remove();
            return doc;
        }));
    }
};