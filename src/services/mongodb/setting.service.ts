import * as mongoose from "mongoose";
import V, {DateMask} from "../../library/variable";
import {
    SelectSettingParamDocument,
} from "../../types/services/setting";
import settingModel, {SettingDocument, InsertSettingParamDocument, UpdateSettingParamDocument} from "../../model/setting.model";

export default {
    async select(params: SelectSettingParamDocument): Promise<SettingDocument[]> {
        params = V.clearAllData(params);

        let filters: mongoose.FilterQuery<SettingDocument> = {}

        if (params.id) {
            filters = {
                ...filters,
                _id: params.id
            }
        }

        return await settingModel.find(filters, {}, {lean: true});
    },
    async insert(params: InsertSettingParamDocument) {
        params = V.clearAllData(params);

        return await settingModel.create({
            defaultLangId: params.defaultLangId || "",
            icon: params.icon || "",
            logo: params.logo || "",
            seoContents: [params.seoContents] || []
        })
    },
    async update(params: UpdateSettingParamDocument) {
        params = V.clearAllData(params);

        await settingModel.findOne({}).then(async doc => {
            if(doc) {
                if (params.defaultLangId) doc.defaultLangId = params.defaultLangId;
                if (params.logo) doc.logo = params.logo;
                if (params.icon) doc.icon = params.icon;
                if (params.seoContents) {
                    const findIndex = doc.seoContents.indexOfKey("langId", params.seoContents.langId);
                    if(findIndex > -1) {
                        doc.seoContents[findIndex] = params.seoContents;
                    }else {
                        doc.seoContents.push(params.seoContents)
                    }
                }
                await doc.save();
            }
        });
    }
};