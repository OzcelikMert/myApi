import * as mongoose from "mongoose";
import settingModel from "../models/setting.model";
import {
    InsertSettingParamDocument,
    SelectSettingParamDocument, SelectSettingResultDocument,
    SettingDocument,
    UpdateSettingParamDocument
} from "../types/services/setting";
import MongoDBHelpers from "../library/mongodb/helpers";
import Variable from "../library/variable";
import {Config} from "../config";

export default {
    async select(params: SelectSettingParamDocument): Promise<SelectSettingResultDocument[]> {
        let filters: mongoose.FilterQuery<SettingDocument> = {}

        let query = settingModel.find(filters, {});

        return (await query.lean().exec())?.map((doc: SelectSettingResultDocument) => {
            if (Array.isArray(doc.seoContents)) {
                const langId = params.langId ?? doc.defaultLangId.toString();
                doc.seoContents = doc.seoContents.findSingle("langId", params.langId) ?? doc.seoContents.findSingle("langId", Config.defaultLangId);
                if (doc.seoContents) {} else {
                    delete doc.seoContents;
                }
            }

            if(Variable.isEmpty(params.getContactFormPasswords)){
                doc.contactForms?.map(contactForm => {
                    delete contactForm.password;
                    return contactForm;
                })
            }

            return doc;
        });
    },
    async insert(params: InsertSettingParamDocument) {
        return await settingModel.create({
            ...params,
            defaultLangId: MongoDBHelpers.createObjectId(params.defaultLangId),
            ...(params.head ? {head: params.head.encode()} : {}),
            ...(params.script ? {head: params.script.encode()} : {}),
            ...(params.contactForms ? {contactForms: params.contactForms} : {}),
            seoContents: [
                {
                    ...params.seoContents,
                    langId: MongoDBHelpers.createObjectId(params.seoContents?.langId)
                }
            ],
        })
    },
    async update(params: UpdateSettingParamDocument) {
        if(params.contactForms){
            params.contactForms.map(contactForm => {
                if(Variable.isEmpty(contactForm.password)){
                    delete contactForm.password;
                }
                return contactForm;
            })
        }

        if(params.defaultLangId){
            Config.defaultLangId = params.defaultLangId;
        }

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

            if (params.contactForms) {
                if (typeof doc.contactForms === "undefined") {
                    doc.contactForms = [];
                }

                // Check delete
                doc.contactForms = doc.contactForms.filter(docContactForm => {
                    if(params.contactForms) {
                        return params.contactForms.indexOfKey("_id", docContactForm._id) > -1;
                    }
                    return true;
                })

                // Check Update
                for(let paramContactForm of params.contactForms) {
                    let docContactForm = doc.contactForms.findSingle("_id", paramContactForm._id);
                    if (docContactForm) {
                        docContactForm = Object.assign(docContactForm, {
                            ...paramContactForm,
                            _id: docContactForm._id,
                        });
                    } else {
                        doc.contactForms.push({
                            ...paramContactForm,
                            _id: undefined,
                        })
                    }
                }

                delete params.contactForms;
            }

            doc = Object.assign(doc, {
                ...params,
                ...(params.head ? {head: params.head.encode()} : {}),
                ...(params.script ? {head: params.script.encode()} : {})
            });

            return await doc.save();
        });
    }
};