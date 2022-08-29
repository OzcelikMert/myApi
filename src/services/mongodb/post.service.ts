import * as mongoose from "mongoose";
import V, {DateMask} from "../../library/variable";
import postModel, {
    PostDocument,
    SelectPostParamDocument,
    InsertPostParamDocument,
    UpdatePostParamDocument, DeletePostParamDocument
} from "../../model/post.model";

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
            typeId: params.typeId,
            statusId: params.statusId,
            order: params.order,
            isFixed: params.isFixed,
            authorId: params.authorId,
            lastAuthorId: params.authorId,
            dateStart: new Date(params.dateStart),
            contents: {
                langId: params.contents.langId,
                image: params.contents.image || "",
                title: params.contents.title || "",
                content: params.contents.content || "",
                shortContent: params.contents.shortContent || "",
                url: params.contents.url || "",
                seoTitle: params.contents.seoTitle || "",
                seoContent: params.contents.seoContent || ""
            }
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
            docs.map( async doc => {
                if (params.statusId) doc.statusId = params.statusId;
                if (params.dateStart) doc.dateStart = params.dateStart;
                if (params.order) doc.order = params.order;
                if (params.isFixed) doc.isFixed = params.isFixed;
                if (params.authorId) doc.lastAuthorId = params.authorId;

                doc.contents.map(content => {
                    if(params.contents){
                        if(params.contents.langId == content.langId) {
                            if(params.contents.image) content.image = params.contents.image;
                            if(params.contents.title) content.title = params.contents.title;
                            if(params.contents.shortContent) content.shortContent = params.contents.shortContent;
                            if(params.contents.content) content.content = params.contents.content;
                            if(params.contents.url) content.url = params.contents.url;
                            if(params.contents.seoTitle) content.seoTitle = params.contents.seoTitle;
                            if(params.contents.seoContent) content.seoContent = params.contents.seoContent;
                        }
                    }
                    return content;
                })

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