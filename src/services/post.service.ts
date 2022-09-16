import * as mongoose from "mongoose";
import V, {DateMask} from "../library/variable";
import postModel from "../models/post.model";
import {
    DeletePostParamDocument,
    InsertPostParamDocument,
    PostDocument,
    SelectPostParamDocument, SelectPostResultDocument,
    UpdatePostParamDocument
} from "../types/services/post";
import {PostTermDocument, SelectPostTermResultDocument} from "../types/services/postTerm";

export default {
    async select(params: SelectPostParamDocument): Promise<SelectPostResultDocument[]> {
        let filters: mongoose.FilterQuery<PostDocument> = {}

        if (params.postId) filters = {
            ...filters,
            _id: params.postId
        }
        if (params.url) filters = {
            ...filters,
            "contents.langId": params.langId,
            "contents.url": params.url
        }
        if (params.typeId) {
            if(Array.isArray(params.typeId)) {
                filters = {
                    ...filters,
                    typeId: { $in: params.typeId }
                }
            }else {
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
                _id: {$nin: params.ignorePostId}
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
            lastAuthorId: params.authorId
        })
    },
    async update(params: UpdatePostParamDocument) {
        let filters: mongoose.FilterQuery<PostDocument> = {}

        if (Array.isArray(params.postId)) {
            filters = {
                _id: {$in: params.postId}
            }
        } else {
            filters = {
                _id: params.postId
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
                const findIndex = doc.contents.indexOfKey("langId", params.contents.langId);
                if (findIndex > -1) {
                    doc.contents[findIndex] = Object.assign(doc.contents[findIndex], params.contents);
                } else {
                    doc.contents.push(params.contents)
                }
                delete params.contents;
            }

            if(params.themeGroups && doc.themeGroups){
                doc.themeGroups.map(docGroup => {
                    let findParamGroup = params.themeGroups?.findSingle("_id", docGroup._id);
                    if (findParamGroup) {
                        docGroup.types.map(docGroupType => {
                            let findParamGroupType = findParamGroup?.types.findSingle("_id", docGroupType._id);
                            if (findParamGroupType) {
                                const findIndex = docGroupType.contents.indexOfKey("langId", findParamGroupType.contents.langId);
                                if (findIndex > -1) {
                                    docGroupType.contents[findIndex] = Object.assign(docGroupType.contents[findIndex], findParamGroupType.contents);
                                } else {
                                    docGroupType.contents.push(findParamGroupType.contents)
                                }
                            }
                        })
                    }
                })
                delete params.themeGroups;
            }

            doc = Object.assign(doc, params);

            return await doc.save();
        });
    },
    async delete(params: DeletePostParamDocument) {
        let filters: mongoose.FilterQuery<PostDocument> = {}

        if (Array.isArray(params.postId)) {
            filters = {
                _id: {$in: params.postId}
            }
        } else {
            filters = {
                _id: params.postId
            };
        }

        return await postModel.deleteMany(filters);
    }
};