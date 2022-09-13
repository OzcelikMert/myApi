import * as mongoose from "mongoose";
import V, {DateMask} from "../library/variable";
import settingModel from "../models/setting.model";
import {
    InsertSettingParamDocument,
    SelectSettingParamDocument, SelectSettingResultDocument,
    SettingDocument,
    UpdateSettingParamDocument
} from "../types/services/setting";

export default {
    async select(params: SelectSettingParamDocument): Promise<SelectSettingResultDocument[]> {
        let filters: mongoose.FilterQuery<SettingDocument> = {}

        let query = settingModel.find(filters, {}).lean();

        return (await query.exec())?.map((doc: SelectSettingResultDocument) => {
            if (Array.isArray(doc.seoContents)) {
                if (params.langId) {
                    let langId = params.langId;
                    doc.seoContents = doc.seoContents.filter(content => content.langId.toString() == langId.toString());
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
            ...params
        })
    },
    async update(params: UpdateSettingParamDocument) {
        return (await settingModel.find({}))?.map(async doc => {
            if (params.seoContents) {
                const findIndex = doc.seoContents.indexOfKey("langId", params.seoContents.langId);
                if (findIndex > -1) {
                    doc.seoContents[findIndex] = Object.assign(doc.seoContents[findIndex], params.seoContents);
                } else {
                    doc.seoContents.push(params.seoContents)
                }
                delete params.seoContents;
            }

            doc = Object.assign(doc, params);

            return await doc.save();
        });
    }
};