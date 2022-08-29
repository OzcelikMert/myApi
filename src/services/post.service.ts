import * as mongoose from "mongoose";
import V, {DateMask} from "../library/variable";
import postModel from "../model/post.model";
import {
    DeletePostParamDocument,
    InsertPostParamDocument,
    PostDocument,
    SelectPostParamDocument,
    UpdatePostParamDocument
} from "../types/services/post";

export default {
    async select(params: SelectPostParamDocument): Promise<PostDocument[]> {
        params = V.clearAllData(params);

        let filters: mongoose.FilterQuery<PostDocument> = {}

        if (params.postId) filters = {
            ...filters,
            _id: params.postId
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

        let query = postModel.find(filters);

        if (params.maxCount) query.limit(params.maxCount);

        return (await query.exec()).map(doc => {
            doc.contents = doc.contents.filter(content => content.langId.toString() == params.langId.toString());
            if (!params.getContents) {
                doc.contents.map(content => {
                    delete content.content;
                    return content;
                })
            }
            return doc;
        });
    },
    async insert(params: InsertPostParamDocument) {
        params = V.clearAllData(params);

        return await postModel.create({
            ...params,
            lastAuthorId: params.authorId
        })
    },
    async update(params: UpdatePostParamDocument) {
        params = V.clearAllData(params);

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
        if(params.typeId){
            filters = {
                ...filters,
                typeId: params.typeId
            }
        }


        let docs = await postModel.find(filters);
        if (docs) {
            delete params.postId;
            delete params.typeId;
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
    async delete(params: DeletePostParamDocument) {
        params = V.clearAllData(params);

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