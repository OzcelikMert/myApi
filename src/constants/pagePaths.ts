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
    language() {
        return pagePathUtil.setPath("language");
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
                let subPath = "seo";
                return pagePathUtil.setPath(path, subPath);
            },
            general() {
                let subPath = "general";
                return pagePathUtil.setPath(path, subPath);
            },
            contactForm() {
                let subPath = "contactForm";
                return pagePathUtil.setPath(path, subPath);
            },
            staticLanguage() {
                let subPath = "staticLanguage";
                return pagePathUtil.setPath(path, subPath);
            },
            socialMedia() {
                let subPath = "socialMedia";
                return pagePathUtil.setPath(path, subPath);
            },
            eCommerce() {
                let subPath = "eCommerce";
                return pagePathUtil.setPath(path, subPath);
            },
        }
    },
    user(withMainPath: boolean = true) {
        let path = withMainPath ? pagePathUtil.setPath("user") : "";

        return {
            self() {
                return pagePathUtil.setPath(path);
            },
            withId(_id: string | number | undefined = ":_id") {
                return pagePathUtil.setPath(path, _id);
            },
            profile() {
                let subPath = "profile";
                return pagePathUtil.setPath(path, subPath);
            },
            changePassword() {
                let subPath = "changePassword";
                return pagePathUtil.setPath(path, subPath);
            },
        }
    },
    subscriber(withMainPath: boolean = true) {
        let path = withMainPath ? pagePathUtil.setPath("subscriber") : "";

        return {
            self() {
                return pagePathUtil.setPath(path);
            },
            withEmail(email: string | number | undefined = ":email") {
                return pagePathUtil.setPath(path, email);
            },
        }
    },
    sitemap(withMainPath: boolean = true) {
        let path = withMainPath ? pagePathUtil.setPath("sitemap") : "";

        return {
            self() {
                return pagePathUtil.setPath(path);
            },
            withName(name: string | number | undefined = ":name") {
                return pagePathUtil.setPath(path, name);
            },
        }
    },
    view(withMainPath: boolean = true) {
        let path = withMainPath ? pagePathUtil.setPath("view") : "";

        return {
            self() {
                return pagePathUtil.setPath(path);
            },
            number() {
                let subPath = "number";
                return pagePathUtil.setPath(path, subPath);
            },
            statistics() {
                let subPath = "statistics";
                return pagePathUtil.setPath(path, subPath);
            },
        }
    },
    component(withMainPath: boolean = true) {
        let path = withMainPath ? pagePathUtil.setPath("component") : "";

        return {
            self() {
                return pagePathUtil.setPath(path);
            },
            withId(_id: string | number | undefined = ":_id") {
                return pagePathUtil.setPath(path, _id);
            },
        }
    },
    navigation(withMainPath: boolean = true) {
        let path = withMainPath ? pagePathUtil.setPath("navigation") : "";

        return {
            self() {
                return pagePathUtil.setPath(path);
            },
            withId(_id: string | number | undefined = ":_id") {
                return pagePathUtil.setPath(path, _id);
            },
        }
    },
    post(withMainPath: boolean = true) {
        let path = withMainPath ? pagePathUtil.setPath("post") : "";

        return {
            self() {
                return pagePathUtil.setPath(path);
            },
            withTypeId(typeId: string | PostTypeId | undefined = ":typeId") {
                path = pagePathUtil.setPath(path, typeId);
                return this
            },
            withId( _id: string | number | undefined = ":_id") {
                return pagePathUtil.setPath(path, _id);
            },
            view() {
                let subPath = "view";
                path = pagePathUtil.setPath(path, subPath);
                return this
            },
        }
    },
    postTerm(withMainPath: boolean = true) {
        let path = withMainPath ? pagePathUtil.setPath("postTerm") : "";

        return {
            self() {
                return pagePathUtil.setPath(path);
            },
            withPostTypeId(postTypeId: string | PostTypeId | undefined = ":postTypeId") {
                path = pagePathUtil.setPath(path, postTypeId);
                return this
            },
            withTypeId(typeId: string | PostTermTypeId | undefined = ":typeId") {
                path =pagePathUtil.setPath(path, typeId);
                return this
            },
            withId(_id: string | number | undefined = ":_id") {
                return pagePathUtil.setPath(path, _id);
            },
        }
    },
}

export default PagePaths;