import * as mongoose from "mongoose";
import postTermModel from "../model/postTerm.model";
import {
    DeletePostTermParamDocument,
    InsertPostTermParamDocument,
    PostTermDocument,
    SelectPostTermParamDocument, SelectPostTermResultDocument,
    UpdatePostTermParamDocument
} from "../types/services/postTerm";

export default {
    async select(params: SelectPostTermParamDocument): Promise<SelectPostTermResultDocument[]> {
        let filters: mongoose.FilterQuery<PostTermDocument> = {}

        if (params.termId) filters = {
            ...filters,
            _id: params.termId
        }
        if (params.url) filters = {
            ...filters,
            url: params.url
        }
        if (params.typeId) filters = {
            ...filters,
            typeId: params.typeId
        }
        if (params.statusId) filters = {
            ...filters,
            statusId: params.statusId
        }
        if (params.postTypeId) filters = {
            ...filters,
            postTypeId: params.postTypeId
        }
        if(params.ignoreTermId){
            filters = {
                ...filters,
                _id: { $ne: { $in: params.ignoreTermId } }
            }
        }

        let query = postTermModel.find(filters, {}).populate<{mainId: SelectPostTermResultDocument["mainId"]}>({
            path: "mainId",
            select: "_id contents.title contents.url contents.langId",
            transform: (doc: PostTermDocument) => {
                doc.contents = doc.contents.filter(content => content.langId.toString() == params.langId.toString());
                return doc;
            }
        }).populate<{authorId: SelectPostTermResultDocument["authorId"]}>({
            path: "authorId",
            select: "_id name email url"
        }).populate<{lastAuthorId: SelectPostTermResultDocument["lastAuthorId"]}>({
            path: "lastAuthorId",
            select: "_id name email url"
        });

        if (params.maxCount) query.limit(params.maxCount);

        return (await query.exec()).map( doc => {
            doc.contents = doc.contents.filter(content => content.langId.toString() == params.langId.toString());
            return doc;
        })
    },
    async insert(params: InsertPostTermParamDocument) {
        return await postTermModel.create({
            ...params,
            lastAuthorId: params.authorId
        })
    },
    async update(params: UpdatePostTermParamDocument) {
        let filters: mongoose.FilterQuery<PostTermDocument> = {}

        if (Array.isArray(params.termId)) {
            filters = {
                _id: {$in: params.termId}
            }
        } else {
            filters = {
                _id: params.termId
            };
        }
        if(params.typeId){
            filters = {
                ...filters,
                typeId: params.typeId
            }
        }
        if (params.postTypeId) filters = {
            ...filters,
            postTypeId: params.postTypeId
        }

        delete params.termId;
        delete params.typeId;
        delete params.postTypeId;
        return (await postTermModel.find(filters)).map( async doc => {
            if(params.contents) {
                const findIndex = doc.contents.indexOfKey("langId", params.contents.langId);
                if(findIndex > -1) {
                    doc.contents[findIndex] = Object.assign(doc.contents[findIndex], params.contents);
                }else {
                    doc.contents.push(params.contents)
                }
                delete params.contents;
            }

            doc = Object.assign(doc, params);

            return await doc.save();
        });
    },
    async delete(params: DeletePostTermParamDocument) {
        let filters: mongoose.FilterQuery<PostTermDocument> = {}

        if (Array.isArray(params.termId)) {
            filters = {
                _id: {$in: params.termId}
            }
        } else {
            filters = {
                _id: params.termId
            };
        }

        return await postTermModel.deleteMany(filters);
    }
};