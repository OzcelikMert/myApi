import * as mongoose from "mongoose";
import V, {DateMask} from "../library/variable";
import postModel from "../models/post.model";
import {
    DeletePostParamDocument,
    InsertPostParamDocument,
    PostDocument, PostThemeGroupDocument,
    SelectPostParamDocument, SelectPostResultDocument,
    UpdatePostParamDocument, UpdatePostStatusIdParamDocument
} from "../types/services/post";
import {PostTermDocument, SelectPostTermResultDocument} from "../types/services/postTerm";
import MongoDBHelpers from "../library/mongodb/helpers";

export default {
    async select(params: SelectPostParamDocument): Promise<SelectPostResultDocument[]> {
        let filters: mongoose.FilterQuery<PostDocument> = {}

        if (params.postId) filters = {
            ...filters,
            _id: MongoDBHelpers.createObjectId(params.postId)
        }
        if (params.url) filters = {
            ...filters,
            "contents.langId": MongoDBHelpers.createObjectId(params.langId),
            "contents.url": params.url
        }
        if (params.typeId) {
            if (Array.isArray(params.typeId)) {
                filters = {
                    ...filters,
                    typeId: {$in: params.typeId}
                }
            } else {
                filters = {
                    ...filters,
                    typeId: params.typeId
                }
            }
        }
        if (params.statusId) filters = {
            ...filters,
            statusId: params.statusId
        }
        if (params.ignorePostId) {
            filters = {
                ...filters,
                _id: {$nin: MongoDBHelpers.createObjectIdArray(params.ignorePostId)}
            }
        }

        let query = postModel.find(filters).populate<{ terms: SelectPostResultDocument["terms"] }>({
            path: "terms",
            select: "_id typeId contents.title contents.langId",
            transform: (doc: SelectPostTermResultDocument) => {
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
        }).populate<{ authorId: SelectPostResultDocument["authorId"] }>({
            path: "authorId",
            select: "_id name email url"
        }).populate<{ lastAuthorId: SelectPostResultDocument["lastAuthorId"] }>({
            path: "lastAuthorId",
            select: "_id name email url"
        }).lean();

        if (params.maxCount) query.limit(params.maxCount);

        return (await query.exec())?.map((doc: SelectPostResultDocument) => {
            if (Array.isArray(doc.contents)) {
                doc.contents = doc.contents.filter(content => content.langId.toString() == params.langId.toString());
                if (doc.contents.length > 0) {
                    doc.contents = doc.contents[0];
                    if (!params.getContents) {
                        delete doc.contents.content;
                    }
                } else {
                    delete doc.contents;
                }
            }

            doc.themeGroups?.map(docThemeGroup => {
                docThemeGroup.types.map(docThemeGroupType => {
                    if (Array.isArray(docThemeGroupType.contents)) {
                        docThemeGroupType.contents = docThemeGroupType.contents.filter(content => content.langId.toString() == params.langId.toString());
                        if (docThemeGroupType.contents.length > 0) {
                            docThemeGroupType.contents = docThemeGroupType.contents[0];
                        } else {
                            delete docThemeGroupType.contents;
                        }
                    }
                })
            })

            return doc;
        });
    },
    async insert(params: InsertPostParamDocument) {
        return await postModel.create({
            ...params,
            terms: MongoDBHelpers.createObjectIdArray(params.terms),
            authorId: MongoDBHelpers.createObjectId(params.authorId),
            lastAuthorId: MongoDBHelpers.createObjectId(params.authorId),
            contents: [
                {
                    ...params.contents,
                    langId: MongoDBHelpers.createObjectId(params.contents.langId)
                }
            ],
            ...(params.themeGroups ? {
                themeGroups: params.themeGroups.map(group => ({
                    ...group,
                    types: group.types.map(type => ({
                        ...type,
                        contents: {
                            ...type.contents,
                            langId: MongoDBHelpers.createObjectId(type.contents.langId)
                        }
                    }))
                }))
            } : {})
        })
    },
    async update(params: UpdatePostParamDocument) {
        let filters: mongoose.FilterQuery<PostDocument> = {}

        if (Array.isArray(params.postId)) {
            filters = {
                _id: {$in: MongoDBHelpers.createObjectIdArray(params.postId)}
            }
        } else {
            filters = {
                _id: MongoDBHelpers.createObjectId(params.postId)
            };
        }
        if (params.typeId) {
            filters = {
                ...filters,
                typeId: params.typeId
            }
        }

        delete params.postId;
        delete params.typeId;
        return (await postModel.find(filters))?.map(async doc => {
            if (params.contents) {
                let docContent = doc.contents.findSingle("langId", params.contents.langId);
                if (docContent) {
                    docContent = {
                        ...docContent,
                        ...params.contents,
                        langId: MongoDBHelpers.createObjectId(params.contents.langId)
                    };
                } else {
                    doc.contents.push({
                        ...params.contents,
                        langId: MongoDBHelpers.createObjectId(params.contents.langId),
                    })
                }
                delete params.contents;
            }

            if (params.themeGroups) {
                if (typeof doc.themeGroups === "undefined") {
                    doc.themeGroups = [];
                }

                for(let paramThemeGroup of params.themeGroups) {
                    let docThemeGroup = doc.themeGroups.findSingle("_id", paramThemeGroup._id);
                    if (docThemeGroup) {
                        for(let paramThemeGroupType of paramThemeGroup.types) {
                            let docThemeGroupType = docThemeGroup.types.findSingle("_id", paramThemeGroupType._id);
                            if(docThemeGroupType){
                                let docGroupTypeContent = docThemeGroupType.contents.findSingle("langId", paramThemeGroupType.contents.langId);
                                if(docGroupTypeContent) {
                                    docGroupTypeContent = {
                                        ...docGroupTypeContent,
                                        ...paramThemeGroupType.contents,
                                        langId: MongoDBHelpers.createObjectId(paramThemeGroupType.contents.langId)
                                    }
                                }else {
                                    docThemeGroupType.contents.push({
                                        ...paramThemeGroupType.contents,
                                        langId: MongoDBHelpers.createObjectId(paramThemeGroupType.contents.langId)
                                    })
                                }
                                docThemeGroupType = {
                                    ...docThemeGroupType,
                                    ...paramThemeGroupType,
                                    contents: docThemeGroupType.contents,
                                    _id: docThemeGroupType._id
                                }
                            }else {
                                docThemeGroup.types.push({
                                    ...paramThemeGroupType,
                                    _id: undefined,
                                    contents: [{
                                        ...paramThemeGroupType.contents,
                                        langId: MongoDBHelpers.createObjectId(paramThemeGroupType.contents.langId)
                                    }]
                                })
                            }
                        }
                        docThemeGroup = {
                            ...docThemeGroup,
                            ...paramThemeGroup,
                            _id: docThemeGroup._id,
                            types: docThemeGroup.types
                        }
                    } else {
                        doc.themeGroups.push({
                            ...paramThemeGroup,
                            _id: undefined,
                            types: paramThemeGroup.types.map(paramThemeGroupType => ({
                                ...paramThemeGroupType,
                                _id: undefined,
                                contents: [{
                                    ...paramThemeGroupType.contents,
                                    langId: MongoDBHelpers.createObjectId(paramThemeGroupType.contents.langId)
                                }]
                            }))
                        })
                    }
                }
                delete params.themeGroups;
            }

            doc = Object.assign(doc, params);

            return await doc.save();
        });
    },
    async updateStatus(params: UpdatePostStatusIdParamDocument) {
        let filters: mongoose.FilterQuery<PostDocument> = {}

        if (Array.isArray(params.postId)) {
            filters = {
                _id: {$in: MongoDBHelpers.createObjectIdArray(params.postId)}
            }
        } else {
            filters = {
                _id: MongoDBHelpers.createObjectId(params.postId)
            };
        }
        if (params.typeId) {
            filters = {
                ...filters,
                typeId: params.typeId
            }
        }

        delete params.postId;
        delete params.typeId;
        return (await postModel.find(filters))?.map(async doc => {
            doc = Object.assign(doc, {
                ...params,
                statusId: params.statusId,
                lastAuthorId: MongoDBHelpers.createObjectId(params.lastAuthorId)
            });

            return await doc.save();
        });
    },
    async delete(params: DeletePostParamDocument) {
        let filters: mongoose.FilterQuery<PostDocument> = {}

        if (Array.isArray(params.postId)) {
            filters = {
                _id: {$in: MongoDBHelpers.createObjectIdArray(params.postId)}
            }
        } else {
            filters = {
                _id: MongoDBHelpers.createObjectId(params.postId)
            };
        }

        return await postModel.deleteMany(filters);
    }
};