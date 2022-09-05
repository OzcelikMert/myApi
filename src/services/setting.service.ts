import * as mongoose from "mongoose";
import V, {DateMask} from "../library/variable";
import settingModel from "../model/setting.model";
import {
    InsertSettingParamDocument,
    SelectSettingParamDocument,
    SettingDocument,
    UpdateSettingParamDocument
} from "../types/services/setting";

export default {
    async select(params: SelectSettingParamDocument): Promise<SettingDocument[]> {
        let filters: mongoose.FilterQuery<SettingDocument> = {}

        return (await settingModel.find(filters, {}, {lean: true})).map( doc => {
            if(params.langId){
                let langId = params.langId;
                doc.seoContents = doc.seoContents.filter(seoContents => seoContents.langId.toString() == langId.toString());
            }else {
                delete doc.seoContents;
            }
            return doc;
        });
    },
    async insert(params: InsertSettingParamDocument) {
        params = V.clearAllData(params);

        return await settingModel.create({
            ...params
        })
    },
    async update(params: UpdateSettingParamDocument) {
        params = V.clearAllData(params);

        let doc = await settingModel.findOne({})
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
    }
};