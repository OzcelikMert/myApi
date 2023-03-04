import {PostTypeId} from "./postTypes";
import {PostTermTypeId} from "./postTermTypes";
import pagePathUtil from "../utils/pagePath.util";

const PagePaths = {
    auth() {
        return pagePathUtil.setPath("auth");
    },
    gallery() {
        return pagePathUtil.setPath("gallery");
    },
    language(withMainPath: boolean = true) {
        let path = withMainPath ? pagePathUtil.setPath("language") : "";

        return {
            self() {
                return pagePathUtil.setPath(path);
            },
            one() {
                path = pagePathUtil.setPath(path, "one");
                return this;
            },
            many() {
                path = pagePathUtil.setPath(path, "many");
                return this;
            },
            withId(_id: string | number | undefined = ":_id") {
                path = pagePathUtil.setPath(path, _id);
                return this;
            },
            flags() {
                return pagePathUtil.setPath(path, "flags");
            },
            rank() {
                return pagePathUtil.setPath(path, "rank");
            }
        }
    },
    serverInfo() {
        return pagePathUtil.setPath("serverInfo");
    },
    mailer() {
        return pagePathUtil.setPath("mailer");
    },
    setting(withMainPath: boolean = true) {
        let path = withMainPath ? pagePathUtil.setPath("setting") : "";

        return {
            self() {
                return pagePathUtil.setPath(path);
            },
            seo() {
                return pagePathUtil.setPath(path, "seo");
            },
            general() {
                return pagePathUtil.setPath(path, "general");
            },
            contactForm() {
                return pagePathUtil.setPath(path, "contactForm");
            },
            staticLanguage() {
                return pagePathUtil.setPath(path, "staticLanguage");
            },
            socialMedia() {
                return pagePathUtil.setPath(path, "socialMedia");
            },
            eCommerce() {
                return pagePathUtil.setPath(path, "eCommerce");
            },
        }
    },
    user(withMainPath: boolean = true) {
        let path = withMainPath ? pagePathUtil.setPath("user") : "";

        return {
            self() {
                return pagePathUtil.setPath(path);
            },
            one() {
                path = pagePathUtil.setPath(path, "one");
                return this;
            },
            many() {
                path = pagePathUtil.setPath(path, "many");
                return this;
            },
            withId(_id: string | number | undefined = ":_id") {
                return pagePathUtil.setPath(path, _id);
            },
            withUrl(url: string | undefined = ":url") {
                return pagePathUtil.setPath(path, "url", url);
            },
            profile() {
                return pagePathUtil.setPath(path, "profile");
            },
            changePassword() {
                return pagePathUtil.setPath(path, "changePassword");
            },
        }
    },
    subscriber(withMainPath: boolean = true) {
        let path = withMainPath ? pagePathUtil.setPath("subscriber") : "";

        return {
            self() {
                return pagePathUtil.setPath(path);
            },
            one() {
                path = pagePathUtil.setPath(path, "one");
                return this;
            },
            many() {
                path = pagePathUtil.setPath(path, "many");
                return this;
            },
            withId(_id: string | number | undefined = ":_id") {
                return pagePathUtil.setPath(path, _id);
            },
            withEmail(email: string | number | undefined = ":email") {
                return pagePathUtil.setPath(path, "email", email);
            },
        }
    },
    sitemap(withMainPath: boolean = true) {
        let path = withMainPath ? pagePathUtil.setPath("sitemap") : "";

        return {
            self() {
                return pagePathUtil.setPath(path);
            },
            post() {
                return pagePathUtil.setPath(path, "post");
            },
            postTerm() {
                return pagePathUtil.setPath(path, "postTerm");
            },
            maps() {
                return pagePathUtil.setPath(path, "maps");
            },
        }
    },
    view(withMainPath: boolean = true) {
        let path = withMainPath ? pagePathUtil.setPath("view") : "";

        return {
            self() {
                return pagePathUtil.setPath(path);
            },
            one() {
                path = pagePathUtil.setPath(path, "one");
                return this;
            },
            many() {
                path = pagePathUtil.setPath(path, "many");
                return this;
            },
            number() {
                return pagePathUtil.setPath(path, "number");
            },
            statistics() {
                return pagePathUtil.setPath(path, "statistics");
            },
        }
    },
    component(withMainPath: boolean = true) {
        let path = withMainPath ? pagePathUtil.setPath("component") : "";

        return {
            self() {
                return pagePathUtil.setPath(path);
            },
            one() {
                path = pagePathUtil.setPath(path, "one");
                return this;
            },
            many() {
                path = pagePathUtil.setPath(path, "many");
                return this;
            },
            withId(_id: string | number | undefined = ":_id") {
                path = pagePathUtil.setPath(path, _id);
                return this;
            },
        }
    },
    navigation(withMainPath: boolean = true) {
        let path = withMainPath ? pagePathUtil.setPath("navigation") : "";

        return {
            self() {
                return pagePathUtil.setPath(path);
            },
            one() {
                path = pagePathUtil.setPath(path, "one");
                return this;
            },
            many() {
                path = pagePathUtil.setPath(path, "many");
                return this;
            },
            status() {
                return pagePathUtil.setPath(path, "status");
            },
            rank() {
                return pagePathUtil.setPath(path, "rank");
            },
            withId(_id: string | number | undefined = ":_id") {
                path = pagePathUtil.setPath(path, _id);
                return this;
            },
        }
    },
    post(withMainPath: boolean = true) {
        let path = withMainPath ? pagePathUtil.setPath("post") : "";

        return {
            self() {
                return pagePathUtil.setPath(path);
            },
            one() {
                path = pagePathUtil.setPath(path, "one");
                return this;
            },
            many() {
                path = pagePathUtil.setPath(path, "many");
                return this;
            },
            withTypeId(typeId: string | PostTypeId | undefined = ":typeId") {
                path = pagePathUtil.setPath(path, typeId);
                return this
            },
            withId(_id: string | number | undefined = ":_id") {
                path = pagePathUtil.setPath(path, _id);
                return this
            },
            view() {
                return pagePathUtil.setPath(path, "view");
            },
            count() {
                return pagePathUtil.setPath(path, "count");
            },
            status() {
                return pagePathUtil.setPath(path, "status");
            },
            rank() {
                return pagePathUtil.setPath(path, "rank");
            },
        }
    },
    postTerm(withMainPath: boolean = true) {
        let path = withMainPath ? pagePathUtil.setPath("postTerm") : "";

        return {
            self() {
                return pagePathUtil.setPath(path);
            },
            one() {
                path = pagePathUtil.setPath(path, "one");
                return this;
            },
            many() {
                path = pagePathUtil.setPath(path, "many");
                return this;
            },
            withPostTypeId(postTypeId: string | PostTypeId | undefined = ":postTypeId") {
                path = pagePathUtil.setPath(path, postTypeId);
                return this
            },
            withTypeId(typeId: string | PostTermTypeId | undefined = ":typeId") {
                path = pagePathUtil.setPath(path, typeId);
                return this
            },
            withId(_id: string | number | undefined = ":_id") {
                path = pagePathUtil.setPath(path, _id);
                return this
            },
            status() {
                return pagePathUtil.setPath(path, "status");
            },
            rank() {
                return pagePathUtil.setPath(path, "rank");
            },
        }
    },
}

export default PagePaths;