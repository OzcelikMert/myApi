import languageService from "../../services/language.service";
import SitemapUtil from "../../utils/functions/sitemap.util";
import {Config} from "../../config";

export default {
    async add(params: {_id: string, typeId: number, langId: string, url: string}) {
        let sitemap = "";
        let sitemapName = SitemapUtil.getPostSitemapName(params.typeId);
        let sitemapUtil = new SitemapUtil(sitemapName);

        let languages = await languageService.select({id: params.langId});
        if (languages.length > 0) {
            let language = languages[0];
            let loc = `${sitemapName}/${params.url}`;
            sitemap = await sitemapUtil.add(
                [{
                    _id: params._id,
                    loc: loc,
                    changefreq: "weekly",
                    priority: "0.5",
                    alternates: [
                        {
                            langShortKey: language.shortKey,
                            langLocale: language.locale,
                            loc: loc
                        }
                    ]
                }]
            );
        }

        return sitemap;
    },
    async update(params: {_id: string, sitemap: string, typeId: number, langId: string, url: string}) {
        let sitemapName = SitemapUtil.getPostSitemapName(params.typeId);
        let sitemapUtil = new SitemapUtil(sitemapName);

        let languages = await languageService.select({id: params.langId});
        if(languages.length > 0){
            let language = languages[0];
            let loc = `${sitemapName}/${params.url}`;
            await sitemapUtil.edit(
                params.sitemap,
                params._id,
                {
                    ...(Config.defaultLangId == params.langId ? {loc: loc} : {}),
                    alternates: [
                        {
                            langShortKey: language.shortKey,
                            langLocale: language.locale,
                            loc: loc
                        }
                    ]
                }
            );
        }
    },
    async delete(params: {_id: string, sitemap: string, typeId: number}) {
        let sitemap = "";
        let sitemapName = SitemapUtil.getPostSitemapName(params.typeId);
        let sitemapUtil = new SitemapUtil(sitemapName);

        await sitemapUtil.delete(params.sitemap, params._id);

        return sitemap;
    },
};