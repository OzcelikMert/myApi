import * as mongoose from "mongoose";
import settingModel from "../models/setting.model";
import {
    InsertSettingParamDocument,
    SelectSettingParamDocument, SelectSettingResultDocument,
    SettingDocument,
    UpdateSettingParamDocument
} from "../types/services/setting";
import MongoDBHelpers from "../library/mongodb/helpers";

export default {
    async select(params: SelectSettingParamDocument): Promise<SelectSettingResultDocument[]> {
        let filters: mongoose.FilterQuery<SettingDocument> = {}

        let query = settingModel.find(filters, {}).lean();

        return (await query.exec())?.map((doc: SelectSettingResultDocument) => {
            if (Array.isArray(doc.seoContents)) {
                if (params.langId) {
                    let langId = params.langId;
                    doc.seoContents = doc.seoContents.filter(content => content.langId.toString() == langId);
                    if (doc.seoContents.length > 0) {
                        doc.seoContents = doc.seoContents[0];
                    } else {
                        delete doc.seoContents;
                    }
                } else {
                    delete doc.seoContents;
                }
            }
            return doc;
        });
    },
    async insert(params: InsertSettingParamDocument) {
        return await settingModel.create({
            ...params,
            defaultLangId: MongoDBHelpers.createObjectId(params.defaultLangId),
            seoContents: [
                {
                    ...params.seoContents,
                    langId: MongoDBHelpers.createObjectId(params.seoContents?.langId)
                }
            ],
        })
    },
    async update(params: UpdateSettingParamDocument) {
        return (await settingModel.find({}))?.map(async doc => {
            if (params.seoContents) {
                let docSeoContent = doc.seoContents.findSingle("langId", params.seoContents.langId);
                if (docSeoContent) {
                    docSeoContent = Object.assign(docSeoContent, {
                        ...params.seoContents,
                        langId: MongoDBHelpers.createObjectId(params.seoContents.langId)
                    });
                } else {
                    doc.seoContents.push({
                        ...params.seoContents,
                        langId: MongoDBHelpers.createObjectId(params.seoContents.langId),
                    })
                }
                delete params.seoContents;
            }

            doc = Object.assign(doc, params);

            return await doc.save();
        });
    }
};