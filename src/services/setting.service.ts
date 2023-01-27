import * as mongoose from "mongoose";
import settingModel from "../models/setting.model";
import {
    InsertSettingParamDocument,
    SelectSettingParamDocument,
    SelectSettingResultDocument,
    SettingDocument,
    UpdateSettingContactFormParamDocument,
    UpdateSettingECommerceParamDocument,
    UpdateSettingGeneralParamDocument,
    UpdateSettingSEOParamDocument,
    UpdateSettingSocialMediaParamDocument,
    UpdateSettingStaticLanguageParamDocument
} from "../types/services/setting";
import MongoDBHelpers from "../library/mongodb/helpers";
import Variable from "../library/variable";
import {Config} from "../config";
import settingObjectIdKeys from "../constants/objectIdKeys/setting.objectIdKeys";

export default {
    async select(params: SelectSettingParamDocument): Promise<SelectSettingResultDocument[]> {
        let filters: mongoose.FilterQuery<SettingDocument> = {}
        let projection: mongoose.ProjectionType<SettingDocument> = {};

        params = MongoDBHelpers.convertObjectIdInData(params, settingObjectIdKeys);
        let defaultLangId = MongoDBHelpers.createObjectId(Config.defaultLangId);

        if(params.onlyDefaultLanguageId){
            projection = {defaultLangId: 1}
        }

        let query = settingModel.find(filters, projection);

        return (await query.lean().exec()).map((doc: SelectSettingResultDocument) => {
            if (Array.isArray(doc.seoContents)) {
                doc.seoContents = doc.seoContents.findSingle("langId", params.langId) ?? doc.seoContents.findSingle("langId", defaultLangId);
            }

            if (Array.isArray(doc.staticLanguages)) {
                doc.staticLanguages = doc.staticLanguages.map(staticLang => {
                    if(Array.isArray(staticLang.contents)){
                        staticLang.contents = staticLang.contents.findSingle("langId", params.langId) ?? staticLang.contents.findSingle("langId", defaultLangId);
                    }
                    return staticLang;
                })
            }

            if (Variable.isEmpty(params.getContactFormPasswords)) {
                doc.contactForms?.map(contactForm => {
                    delete contactForm.password;
                    return contactForm;
                })
            }

            return doc;
        });
    },
    async insert(params: InsertSettingParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, settingObjectIdKeys);

        return await settingModel.create(params)
    },
    async updateGeneral(params: UpdateSettingGeneralParamDocument) {
        params = Variable.clearAllScriptTags(params, ["head", "script"]);
        params = MongoDBHelpers.convertObjectIdInData(params, settingObjectIdKeys);

        if (params.defaultLangId) {
            Config.defaultLangId = params.defaultLangId.toString();
        }

        return await Promise.all((await settingModel.find({}).exec()).map(async doc => {
            doc = Object.assign(doc, params);

            await doc.save();
            return params;
        }));
    },
    async updateSEO(params: UpdateSettingSEOParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, settingObjectIdKeys);

        return await Promise.all((await settingModel.find({}).exec()).map(async doc => {
            if (params.seoContents) {
                let docSeoContent = doc.seoContents.findSingle("langId", params.seoContents.langId);
                if (docSeoContent) {
                    docSeoContent = Object.assign(docSeoContent, params.seoContents);
                } else {
                    doc.seoContents.push(params.seoContents)
                }
                delete params.seoContents;
            }
            doc = Object.assign(doc, params);

            await doc.save();
            return params;
        }));
    },
    async updateContactForm(params: UpdateSettingContactFormParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, settingObjectIdKeys);

        if (params.contactForms) {
            params.contactForms.map(contactForm => {
                if (Variable.isEmpty(contactForm.password)) {
                    delete contactForm.password;
                }
                return contactForm;
            })
        }

        return await Promise.all((await settingModel.find({}).exec()).map(async doc => {
            doc.contactForms = params.contactForms;
            await doc.save();
            return params;
        }));
    },
    async updateStaticLanguage(params: UpdateSettingStaticLanguageParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, settingObjectIdKeys);

        return await Promise.all((await settingModel.find({}).exec()).map(async doc => {
            if (params.staticLanguages) {
                // Check delete
                doc.staticLanguages = doc.staticLanguages.filter(staticLanguage =>  params.staticLanguages && params.staticLanguages.indexOfKey("_id", staticLanguage._id) > -1)
                // Check Update
                for (let paramStaticLanguage of params.staticLanguages) {
                    let docStaticLanguage = doc.staticLanguages.findSingle("_id", paramStaticLanguage._id);
                    if (docStaticLanguage) {
                        let docStaticLanguageContent = docStaticLanguage.contents.findSingle("langId", paramStaticLanguage.contents.langId);
                        if (docStaticLanguageContent) {
                            docStaticLanguageContent = Object.assign(docStaticLanguageContent, paramStaticLanguage.contents);
                        } else {
                            docStaticLanguage.contents.push(paramStaticLanguage.contents)
                        }
                        docStaticLanguage = Object.assign(docStaticLanguage, {
                            ...paramStaticLanguage,
                            contents: docStaticLanguage.contents,
                            _id: docStaticLanguage._id
                        })
                    } else {
                        doc.staticLanguages.push({
                            ...paramStaticLanguage,
                            contents: [paramStaticLanguage.contents]
                        })
                    }
                }
                delete params.staticLanguages;
            }

            doc = Object.assign(doc, params);

            await doc.save();
            return params;
        }));
    },
    async updateSocialMedia(params: UpdateSettingSocialMediaParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, settingObjectIdKeys);

        return await Promise.all((await settingModel.find({}).exec()).map(async doc => {
            doc.socialMedia = params.socialMedia;
            await doc.save();
            return params;
        }));
    },
    async updateECommerce(params: UpdateSettingECommerceParamDocument) {
        params = Variable.clearAllScriptTags(params);
        params = MongoDBHelpers.convertObjectIdInData(params, settingObjectIdKeys);

        return await Promise.all((await settingModel.find({}).exec()).map(async doc => {
            doc = Object.assign(doc, params);
            await doc.save();
            return params;
        }));
    },
};