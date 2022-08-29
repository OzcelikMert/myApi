import * as mongoose from "mongoose";
import V, {DateMask} from "../library/variable";
import postTermModel from "../model/postTerm.model";
import {
    DeletePostTermParamDocument,
    InsertPostTermParamDocument,
    PostTermDocument,
    SelectPostTermParamDocument,
    UpdatePostTermParamDocument
} from "../types/services/postTerm";

export default {
    async select(params: SelectPostTermParamDocument): Promise<PostTermDocument[]> {
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

        let docs = await postTermModel.find(filters, {}, {lean: true});
        if(docs){
            docs.map( doc => {
                doc.contents = doc.contents.filter(content => content.langId.toString() == params.langId.toString());
                return doc;
            })
        }
        return docs;
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


        let docs = await postTermModel.find(filters);
        if (docs) {
            delete params.termId;
            delete params.typeId;
            delete params.postTypeId;
            docs.map( async doc => {
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

                await doc.save();
            })
        }
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