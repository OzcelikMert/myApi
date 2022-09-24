import * as mongoose from "mongoose";
import navigateModel from "../models/navigate.model";
import {
    DeleteNavigateParamDocument,
    InsertNavigateParamDocument,
    NavigateDocument,
    SelectNavigateParamDocument, SelectNavigateResultDocument,
    UpdateNavigateParamDocument
} from "../types/services/navigate";
import MongoDBHelpers from "../library/mongodb/helpers";
import Variable from "../library/variable";

export default {
    async select(params: SelectNavigateParamDocument): Promise<SelectNavigateResultDocument[]> {
        let filters: mongoose.FilterQuery<NavigateDocument> = {}

        if (params.navigateId) filters = {
            ...filters,
            _id: MongoDBHelpers.createObjectId(params.navigateId)
        }
        if (params.statusId) filters = {
            ...filters,
            statusId: params.statusId
        }

        let query = navigateModel.find(filters).populate<{ mainId: SelectNavigateResultDocument["mainId"] }>({
            path: "mainId",
            select: "_id contents.title contents.url contents.langId",
            transform: (doc: SelectNavigateResultDocument) => {
                if (Array.isArray(doc.contents)) {
                    doc.contents = doc.contents.filter(content => content.langId.toString() == params.langId);
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
                doc.contents = doc.contents.filter(content => content.langId.toString() == params.langId);
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
        if(Variable.isEmpty(params.mainId)){
            delete params.mainId;
        }

        return await navigateModel.create({
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
        })
    },
    async update(params: UpdateNavigateParamDocument) {
        let filters: mongoose.FilterQuery<NavigateDocument> = {}

        if(Variable.isEmpty(params.mainId)){
            delete params.mainId;
        }

        if (Array.isArray(params.navigateId)) {
            filters = {
                _id: {$in: MongoDBHelpers.createObjectIdArray(params.navigateId)}
            }
        } else {
            filters = {
                _id: MongoDBHelpers.createObjectId(params.navigateId)
            };
        }

        delete params.navigateId;
        return (await navigateModel.find(filters))?.map(async doc => {
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

            return await doc.save();
        });
    },
    async delete(params: DeleteNavigateParamDocument) {
        let filters: mongoose.FilterQuery<NavigateDocument> = {}

        if (Array.isArray(params.navigateId)) {
            filters = {
                _id: {$in: MongoDBHelpers.createObjectIdArray(params.navigateId)}
            }
        } else {
            filters = {
                _id: MongoDBHelpers.createObjectId(params.navigateId)
            };
        }

        return await navigateModel.deleteMany(filters);
    }
};