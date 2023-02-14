import * as mongoose from "mongoose";
import MongoDBHelpers from "../library/mongodb/helpers";
import {Config} from "../config";
import {
    ComponentDocument, DeleteComponentParamDocument, InsertComponentParamDocument,
    SelectComponentParamDocument,
    SelectComponentResultDocument, UpdateComponentParamDocument
} from "../types/services/component";
import componentModel from "../models/component.model";
import Variable from "../library/variable";
import componentObjectIdKeys from "../constants/objectIdKeys/component.objectIdKeys";

export default {
    async select(params: SelectComponentParamDocument): Promise<SelectComponentResultDocument[]> {
        let filters: mongoose.FilterQuery<ComponentDocument> = {}
        params = MongoDBHelpers.convertObjectIdInData(params, componentObjectIdKeys);
        let defaultLangId = MongoDBHelpers.createObjectId(Config.defaultLangId);

        if (params._id) filters = {
            ...filters,
            _id: params._id
        }

        if (params.elementId) filters = {
            ...filters,
            elementId: params.elementId
        }

        let query = componentModel.find(filters).populate<{ authorId: SelectComponentResultDocument["authorId"] }>({
            path: "authorId",
            select: "_id name email url"
        }).populate<{ lastAuthorId: SelectComponentResultDocument["lastAuthorId"] }>({
            path: "lastAuthorId",
            select: "_id name email url"
        });

        query.sort({order: -1, createdAt: -1});

        return (await query.lean().exec()).map((doc: SelectComponentResultDocument) => {
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

            return doc;
        });
    },
    async insert(params: InsertComponentParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, componentObjectIdKeys);

        return await componentModel.create(params)
    },
    async update(params: UpdateComponentParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, componentObjectIdKeys);

        let filters: mongoose.FilterQuery<ComponentDocument> = {}

        if (params._id) {
            filters = {
                _id: params._id
            };
        }

        return await Promise.all((await componentModel.find(filters).exec()).map(async doc => {
            if(params.types){
                // Check delete
                doc.types = doc.types.filter(docType =>  params.types && params.types.indexOfKey("_id", docType._id) > -1)
                // Check Update
                for (let paramThemeGroupType of params.types) {
                    let docThemeGroupType = doc.types.findSingle("_id", paramThemeGroupType._id);
                    if (docThemeGroupType) {
                        let docGroupTypeContent = docThemeGroupType.contents.findSingle("langId", paramThemeGroupType.contents.langId);
                        if (docGroupTypeContent) {
                            docGroupTypeContent = Object.assign(docGroupTypeContent, paramThemeGroupType.contents);
                        } else {
                            docThemeGroupType.contents.push(paramThemeGroupType.contents)
                        }
                        docThemeGroupType = Object.assign(docThemeGroupType, {
                            ...paramThemeGroupType,
                            contents: docThemeGroupType.contents,
                            _id: docThemeGroupType._id
                        })
                    } else {
                        doc.types.push({
                            ...paramThemeGroupType,
                            contents: [paramThemeGroupType.contents]
                        })
                    }
                }
                delete params.types;
            }

            doc = Object.assign(doc, params);

            await doc.save();

            return {_id: doc._id}
        }));
    },
    async delete(params: DeleteComponentParamDocument) {
        let filters: mongoose.FilterQuery<ComponentDocument> = {}
        params = MongoDBHelpers.convertObjectIdInData(params, componentObjectIdKeys);

        if (Array.isArray(params._id)) {
            filters = {
                _id: {$in: params._id}
            }
        } else {
            filters = {
                _id: params._id
            };
        }

        return await Promise.all((await componentModel.find(filters).exec()).map(async doc => {
            await doc.remove();
            return {_id: doc._id};
        }))
    }
};