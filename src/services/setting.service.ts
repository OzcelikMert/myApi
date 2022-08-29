import * as mongoose from "mongoose";
import V, {DateMask} from "../library/variable";
import settingModel from "../model/setting.model";
import {InsertSettingParamDocument, SettingDocument, UpdateSettingParamDocument} from "../types/services/setting";

export default {
    async select(): Promise<SettingDocument[]> {
        let filters: mongoose.FilterQuery<SettingDocument> = {}

        return await settingModel.find(filters, {}, {lean: true});
    },
    async insert(params: InsertSettingParamDocument) {
        params = V.clearAllData(params);

        return await settingModel.create({
            ...params
        })
    },
    async update(params: UpdateSettingParamDocument) {
        params = V.clearAllData(params);

        await settingModel.findOne({}).then(async doc => {
            if(doc) {
                if (params.seoContents) {
                    const findIndex = doc.seoContents.indexOfKey("langId", params.seoContents.langId);
                    if(findIndex > -1) {
                        doc.seoContents[findIndex] = Object.assign(doc.seoContents[findIndex], params.seoContents);
                    }else {
                        doc.seoContents.push(params.seoContents)
                    }
                    delete params.seoContents;
                }

                doc = Object.assign(doc, params);

                await doc.save();
            }
        });
    }
};