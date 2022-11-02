import {
    SitemapChildrenJsonDocument
} from "../../library/types/sitemap";
import Sitemap from "../../library/sitemap";
import {Config} from "../../config";

export enum SitemapNameTypes {
    Page = 1,
    Post,
}

function getTypeName(type: SitemapNameTypes) {
    let typeString = "";
    switch (type) {
        case SitemapNameTypes.Page:
            typeString = "page";
            break;
        case SitemapNameTypes.Post:
            typeString = "post";
            break;
    }
    return typeString;
}

export default {
    async add(nameType: SitemapNameTypes, data: SitemapChildrenJsonDocument[]) {
        let sitemap = new Sitemap( getTypeName(nameType));
        return await sitemap.addRow(data);
    },
    async edit(fileCode: string, nameType: SitemapNameTypes, _id: string, data: SitemapChildrenJsonDocument) {
        let sitemap = new Sitemap(getTypeName(nameType));
        await sitemap.updateRow(fileCode, _id, data);
    },
    async delete(fileCode: string, nameType: SitemapNameTypes, _id: string,) {
        let sitemap = new Sitemap(getTypeName(nameType));
        await sitemap.deleteRow(fileCode, _id);
    },
}