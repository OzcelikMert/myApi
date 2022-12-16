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

export default {
    async select(params: SelectComponentParamDocument): Promise<SelectComponentResultDocument[]> {
        let filters: mongoose.FilterQuery<ComponentDocument> = {}

        if (params.componentId) filters = {
            ...filters,
            _id: MongoDBHelpers.createObjectId(params.componentId)
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

        return (await query.lean().exec()).map((doc: SelectComponentResultDocument) => {
            doc.types.map(docType => {
                if (Array.isArray(docType.contents)) {
                    docType.contents = docType.contents.findSingle("langId", params.langId) ?? docType.contents.findSingle("langId", Config.defaultLangId);
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

        return await componentModel.create({
            ...params,
            authorId: MongoDBHelpers.createObjectId(params.authorId),
            lastAuthorId: MongoDBHelpers.createObjectId(params.authorId),
            types: params.types.map(type => ({
                ...type,
                _id: undefined,
                contents: {
                    ...type.contents,
                    langId: MongoDBHelpers.createObjectId(type.contents.langId)
                }
            }))
        })
    },
    async update(params: UpdateComponentParamDocument) {
        params = Variable.clearAllScriptTags(params);

        let filters: mongoose.FilterQuery<ComponentDocument> = {}

        if (params.componentId) {
            filters = {
                _id: MongoDBHelpers.createObjectId(params.componentId)
            };
        }

        delete params.componentId;
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
                            docGroupTypeContent = Object.assign(docGroupTypeContent, {
                                ...paramThemeGroupType.contents,
                                langId: MongoDBHelpers.createObjectId(paramThemeGroupType.contents.langId)
                            });
                        } else {
                            docThemeGroupType.contents.push({
                                ...paramThemeGroupType.contents,
                                _id: undefined,
                                langId: MongoDBHelpers.createObjectId(paramThemeGroupType.contents.langId)
                            })
                        }
                        docThemeGroupType = Object.assign(docThemeGroupType, {
                            ...paramThemeGroupType,
                            contents: docThemeGroupType.contents,
                            _id: docThemeGroupType._id
                        })
                    } else {
                        doc.types.push({
                            ...paramThemeGroupType,
                            _id: undefined,
                            contents: [{
                                ...paramThemeGroupType.contents,
                                langId: MongoDBHelpers.createObjectId(paramThemeGroupType.contents.langId)
                            }]
                        })
                    }
                }
                delete params.types;
            }

            doc = Object.assign(doc, {
                ...params,
            });

            await doc.save();

            return {_id: doc._id}
        }));
    },
    async delete(params: DeleteComponentParamDocument) {
        let filters: mongoose.FilterQuery<ComponentDocument> = {}

        if (Array.isArray(params.componentId)) {
            filters = {
                _id: {$in: MongoDBHelpers.createObjectIdArray(params.componentId)}
            }
        } else {
            filters = {
                _id: MongoDBHelpers.createObjectId(params.componentId)
            };
        }

        return await Promise.all((await componentModel.find(filters).exec()).map(async doc => {
            await doc.remove();
            return {_id: doc._id};
        }))
    }
};