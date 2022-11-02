import {NextFunction, Request, Response} from "express";
import {InferType} from "yup";
import postSchema from "../../schemas/post.schema";
import postService from "../../services/post.service";
import sitemapUtil, {SitemapNameTypes} from "../../utils/functions/sitemap.util";
import {PostTypeId} from "../../constants/postTypes";
import {Config} from "../../config";
import languageService from "../../services/language.service";

export default {
    add: async (
        req: Request<any, any, any, any>,
        res: Response,
        next: NextFunction
    ) => {
        let data: InferType<typeof postSchema.post> = req;

        /*let languages = await languageService.select({id: data.body.contents.langId});
        if(languages.length > 0){
            let language = languages[0];
            req.body.siteMap = await sitemapUtil.add(
                data.params.typeId == PostTypeId.Page ? SitemapNameTypes.Page : SitemapNameTypes.Post,
                [
                    {
                        loc: Config.url.server + data.body.contents.url,
                        lastmod: new Date().toISOString(),
                        changefreq: "weekly",
                        priority: "0.5",
                        "xhtml:link": [
                            {
                                $: {
                                    hreflang: `${language.shortKey}-${language.locale}`,
                                    rel: "alternate",
                                    href: Config.url.server + data.body.contents.url
                                }
                            }
                        ]
                    }
                ]
            );
        }*/

        next();
    },
    update: async (
        req: Request<any, any, any, any>,
        res: Response,
        next: NextFunction
    ) => {
        let data: InferType<typeof postSchema.put> = req;

        /*let posts = await postService.select({
            langId: Config.defaultLangId,
            postId: data.params.postId,
            typeId: data.params.typeId
        });

        for(const post of posts){
            let languages = await languageService.select({id: data.body.contents.langId});
            if(!Array.isArray(post.contents) && languages.length > 0){
                let language = languages[0]
                await sitemapUtil.edit(
                    post.siteMap || "",
                    data.params.typeId == PostTypeId.Page ? SitemapNameTypes.Page : SitemapNameTypes.Post,
                    Config.url.server  + post.contents?.url,
                    {
                        ...(Config.defaultLangId == data.body.contents.langId ? {loc: Config.url.server + data.body.contents.url} : {}),
                        "xhtml:link": [
                            {
                                $: {
                                    hreflang: `${language.shortKey}-${language.locale}`,
                                    rel: "alternate",
                                    href: Config.url.server + data.body.contents.url
                                }
                            }
                        ]
                    }
                );
            }
        }*/

        next();
    },
}