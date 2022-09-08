import * as mongoose from "mongoose";
import navigateModel from "../model/navigate.model";
import {
    DeleteNavigateParamDocument,
    InsertNavigateParamDocument,
    NavigateDocument,
    SelectNavigateParamDocument, SelectNavigateResultDocument,
    UpdateNavigateParamDocument
} from "../types/services/navigate";

export default {
    async select(params: SelectNavigateParamDocument): Promise<SelectNavigateResultDocument[]> {

        let filters: mongoose.FilterQuery<NavigateDocument> = {}

        if (params.navigateId) filters = {
            ...filters,
            _id: params.navigateId
        }
        if (params.statusId) filters = {
            ...filters,
            url: params.statusId
        }

        let query = navigateModel.find(filters).populate<{ mainId: SelectNavigateResultDocument["mainId"] }>({
            path: "mainId",
            select: "_id contents.title contents.url contents.langId",
            transform: (doc: SelectNavigateResultDocument) => {
                if (Array.isArray(doc.contents)) {
                    doc.contents = doc.contents.filter(content => content.langId.toString() == params.langId.toString());
                    if (doc.contents.length > 0) {
                        doc.contents = doc.contents[0];
                    } else {
                        delete doc.contents;
                    }
                }
                return doc;
            }
        }).populate<{ authorId: SelectNavigateResultDocument["authorId"] }>({
            path: "authorId",
            select: "_id name email url"
        }).populate<{ lastAuthorId: SelectNavigateResultDocument["lastAuthorId"] }>({
            path: "lastAuthorId",
            select: "_id name email url"
        }).lean();

        return (await query.exec())?.map((doc: SelectNavigateResultDocument) => {
            if (Array.isArray(doc.contents)) {
                doc.contents = doc.contents.filter(content => content.langId.toString() == params.langId.toString());
                if (doc.contents.length > 0) {
                    doc.contents = doc.contents[0];
                } else {
                    delete doc.contents;
                }
            }
            return doc;
        });
    },
    async insert(params: InsertNavigateParamDocument) {
        return await navigateModel.create({
            ...params,
            lastAuthorId: params.authorId
        })
    },
    async update(params: UpdateNavigateParamDocument) {
        let filters: mongoose.FilterQuery<NavigateDocument> = {}

        if (Array.isArray(params.navigateId)) {
            filters = {
                _id: {$in: params.navigateId}
            }
        } else {
            filters = {
                _id: params.navigateId
            };
        }

        delete params.navigateId;
        return (await navigateModel.find(filters))?.map(async doc => {
            if (params.contents) {
                const findIndex = doc.contents.indexOfKey("langId", params.contents.langId);
                if (findIndex > -1) {
                    doc.contents[findIndex] = Object.assign(doc.contents[findIndex], params.contents);
                } else {
                    doc.contents.push(params.contents)
                }
                delete params.contents;
            }

            doc = Object.assign(doc, params);

            return await doc.save();
        });
    },
    async delete(params: DeleteNavigateParamDocument) {
        let filters: mongoose.FilterQuery<NavigateDocument> = {}

        if (Array.isArray(params.navigateId)) {
            filters = {
                _id: {$in: params.navigateId}
            }
        } else {
            filters = {
                _id: params.navigateId
            };
        }

        return await navigateModel.deleteMany(filters);
    }
};