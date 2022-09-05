import * as mongoose from "mongoose";
import navigateModel from "../model/navigate.model";
import {
    DeleteNavigateParamDocument,
    InsertNavigateParamDocument,
    NavigateDocument,
    SelectNavigateParamDocument,
    UpdateNavigateParamDocument
} from "../types/services/navigate";
import {PostTermDocument} from "../types/services/postTerm";

export default {
    async select(params: SelectNavigateParamDocument): Promise<NavigateDocument[]> {

        let filters: mongoose.FilterQuery<NavigateDocument> = {}

        if (params.navigateId) filters = {
            ...filters,
            _id: params.navigateId
        }
        if (params.statusId) filters = {
            ...filters,
            url: params.statusId
        }

        let query = navigateModel.find(filters, {}).populate({
            path: "mainId",
            select: "_id contents.title contents.url contents.langId",
            transform: (doc: PostTermDocument) => {
                doc.contents = doc.contents.filter(content => content.langId.toString() == params.langId.toString());
                return doc;
            }
        }).populate({
            path: "authorId",
            select: "_id name email url"
        }).populate({
            path: "lastAuthorId",
            select: "_id name email url"
        });

        return (await query.exec()).map(doc => {
            doc.contents = doc.contents.filter(content => content.langId.toString() == params.langId.toString());
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


        let docs = await navigateModel.find(filters);
        if (docs) {
            delete params.navigateId;
            docs.map(async doc => {
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

                await doc.save();
            })
        }
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