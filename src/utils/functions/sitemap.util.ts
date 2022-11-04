import {
    SitemapChildrenDocument
} from "../../library/types/sitemap";
import Sitemap from "../../library/sitemap";
import config from "config";
import {PostTypeId} from "../../constants/postTypes";
import {
    SitemapUtilChildrenAlternateDocument,
    SitemapUtilChildrenDocument
} from "../../types/utils/functions/sitemap.util";

const clientUrl = config.get("clientUrl") as string;

export default class SitemapUtil {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    static isPostSitemapRequire(typeId: PostTypeId){
        return [PostTypeId.Page, PostTypeId.Blog, PostTypeId.Portfolio].includes(typeId);
    }

    static getPostSitemapName(typeId: PostTypeId){
        const indexOfS = Object.values(PostTypeId).indexOf(typeId);
        return Object.keys(PostTypeId)[indexOfS].toLowerCase();
    }

    private convertData(data: SitemapUtilChildrenDocument): SitemapChildrenDocument {
        let convertedData: SitemapChildrenDocument = {};

        if(data.loc){
            convertedData.loc = new URL(data.loc, clientUrl).href;
        }

        if(data.alternates){
            convertedData["xhtml:link"] = data.alternates.map(alternate => ({
                $: {
                    rel: "alternate",
                    hreflang: `${alternate.langShortKey}-${alternate.langLocale}`,
                    href: new URL(`${alternate.langShortKey}-${alternate.langLocale}/${alternate.loc}`, clientUrl).href
                }
            }))
            delete data.alternates;
        }

        convertedData.lastmod = new Date().toISOString();

        return {
            ...data,
            ...convertedData
        };
    }

    async add(data: SitemapUtilChildrenDocument[]) {
        let sitemap = new Sitemap(this.name);
        return await sitemap.addRow(clientUrl, data.map(d => this.convertData(d)));
    }
    async edit(fileCode: string, _id: string, data: SitemapUtilChildrenDocument) {
        let sitemap = new Sitemap(this.name);
        await sitemap.updateRow(fileCode, _id, this.convertData(data));
    }
    async delete(fileCode: string, _id: string,) {
        let sitemap = new Sitemap(this.name);
        await sitemap.deleteRow(fileCode, _id);
    }
}