import {PostTypeId} from "./postTypes";
import {PostTermTypeId} from "./postTermTypes";

function setPath(...paths: (number | string | undefined)[]) {
    let returnPath = "";
    for (let path of paths) {
        if (path) {
            if (
                typeof path === "string" &&
                path.length > 0 &&
                path.startsWith("/")
            ) {
                path = path.slice(1);
            }

            returnPath += `/${path}`;
        }
    }
    return returnPath;
}

const PagePaths = {
    auth() {
        return setPath("auth");
    },
    gallery() {
        return setPath("gallery");
    },
    language() {
        return setPath("language");
    },
    serverInfo() {
        return setPath("serverInfo");
    },
    mailer() {
        return setPath("mailer");
    },
    setting(withMainPath: boolean = true) {
        let path = withMainPath ? setPath("setting") : "";

        return {
            self() {
                return setPath(path);
            },
            seo() {
                let subPath = "seo";
                return setPath(path, subPath);
            },
            general() {
                let subPath = "general";
                return setPath(path, subPath);
            },
            contactForm() {
                let subPath = "contactForm";
                return setPath(path, subPath);
            },
            staticLanguage() {
                let subPath = "staticLanguage";
                return setPath(path, subPath);
            },
            socialMedia() {
                let subPath = "socialMedia";
                return setPath(path, subPath);
            },
            eCommerce() {
                let subPath = "eCommerce";
                return setPath(path, subPath);
            },
        }
    },
    user(withMainPath: boolean = true) {
        let path = withMainPath ? setPath("user") : "";

        return {
            self() {
                return setPath(path);
            },
            withId(_id: string | number | undefined = ":_id") {
                return setPath(path, _id);
            },
            profile() {
                let subPath = "profile";
                return setPath(path, subPath);
            },
            changePassword() {
                let subPath = "changePassword";
                return setPath(path, subPath);
            },
        }
    },
    subscriber(withMainPath: boolean = true) {
        let path = withMainPath ? setPath("subscriber") : "";

        return {
            self() {
                return setPath(path);
            },
            withEmail(email: string | number | undefined = ":email") {
                return setPath(path, email);
            },
        }
    },
    sitemap(withMainPath: boolean = true) {
        let path = withMainPath ? setPath("sitemap") : "";

        return {
            self() {
                return setPath(path);
            },
            withName(name: string | number | undefined = ":name") {
                return setPath(path, name);
            },
        }
    },
    view(withMainPath: boolean = true) {
        let path = withMainPath ? setPath("view") : "";

        return {
            self() {
                return setPath(path);
            },
            number() {
                let subPath = "number";
                return setPath(path, subPath);
            },
            statistics() {
                let subPath = "statistics";
                return setPath(path, subPath);
            },
        }
    },
    component(withMainPath: boolean = true) {
        let path = withMainPath ? setPath("component") : "";

        return {
            self() {
                return setPath(path);
            },
            withId(_id: string | number | undefined = ":_id") {
                return setPath(path, _id);
            },
        }
    },
    navigation(withMainPath: boolean = true) {
        let path = withMainPath ? setPath("navigation") : "";

        return {
            self() {
                return setPath(path);
            },
            withId(_id: string | number | undefined = ":_id") {
                return setPath(path, _id);
            },
        }
    },
    post(withMainPath: boolean = true) {
        let path = withMainPath ? setPath("post") : "";

        return {
            self() {
                return setPath(path);
            },
            withTypeId(typeId: string | PostTypeId | undefined = ":typeId") {
                path = setPath(path, typeId);
                return this
            },
            withId( _id: string | number | undefined = ":_id") {
                return setPath(path, _id);
            },
            view() {
                let subPath = "view";
                path = setPath(path, subPath);
                return this
            },
        }
    },
    postTerm(withMainPath: boolean = true) {
        let path = withMainPath ? setPath("postTerm") : "";

        return {
            self() {
                return setPath(path);
            },
            withPostTypeId(postTypeId: string | PostTypeId | undefined = ":postTypeId") {
                path = setPath(path, postTypeId);
                return this
            },
            withTypeId(typeId: string | PostTermTypeId | undefined = ":typeId") {
                path =setPath(path, typeId);
                return this
            },
            withId(_id: string | number | undefined = ":_id") {
                return setPath(path, _id);
            },
        }
    },
}

export default PagePaths;