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
    setting() {
        let path = setPath("setting");

        return {
            self() {
                return setPath(path);
            },
            seo(withMainPath: boolean = true) {
                let subPath = "seo";
                return withMainPath ?  setPath(path, subPath) : setPath(subPath);
            },
            general(withMainPath: boolean = true) {
                let subPath = "general";
                return withMainPath ?  setPath(path, subPath) : setPath(subPath);
            },
            contactForm(withMainPath: boolean = true) {
                let subPath = "contactForm";
                return withMainPath ?  setPath(path, subPath) : setPath(subPath);
            },
            staticLanguage(withMainPath: boolean = true) {
                let subPath = "staticLanguage";
                return withMainPath ?  setPath(path, subPath) : setPath(subPath);
            },
        }
    },
    user() {
        let path = setPath("user");

        return {
            self() {
                return setPath(path);
            },
            withId(withMainPath: boolean = true, _id: string | number | undefined = ":userId") {
                return withMainPath ?  setPath(path, _id) : setPath(_id);
            },
            profile(withMainPath: boolean = true) {
                let subPath = "profile";
                return withMainPath ?  setPath(path, subPath) : setPath(subPath);
            },
            changePassword(withMainPath: boolean = true) {
                let subPath = "changePassword";
                return withMainPath ?  setPath(path, subPath) : setPath(subPath);
            },
        }
    },
    subscriber() {
        let path = setPath("subscriber");

        return {
            self() {
                return setPath(path);
            },
            withEmail(withMainPath: boolean = true, email: string | number | undefined = ":email") {
                return withMainPath ?  setPath(path, email) : setPath(email);
            },
        }
    },
    sitemap() {
        let path = setPath("sitemap");

        return {
            self() {
                return setPath(path);
            },
            withName(withMainPath: boolean = true, name: string | number | undefined = ":name") {
                return withMainPath ?  setPath(path, name) : setPath(name);
            },
        }
    },
    view() {
        let path = setPath("view");

        return {
            self() {
                return setPath(path);
            },
            number(withMainPath: boolean = true) {
                let subPath = "number";
                return withMainPath ?  setPath(path, subPath) : setPath(subPath);
            },
            statistics(withMainPath: boolean = true) {
                let subPath = "statistics";
                return withMainPath ?  setPath(path, subPath) : setPath(subPath);
            },
        }
    },
    component() {
        let path = setPath("component");

        return {
            self() {
                return setPath(path);
            },
            withId(withMainPath: boolean = true, _id: string | number | undefined = ":componentId") {
                return withMainPath ?  setPath(path, _id) : setPath(_id);
            },
        }
    },
    post(firstPath?: string) {
        let path = setPath("post");

        return {
            self() {
                return setPath(path);
            },
            withTypeId(withMainPath: boolean = true, typeId: string | PostTypeId | undefined = ":typeId") {
                path = withMainPath ?  setPath(firstPath, path, typeId) : setPath(firstPath, typeId);
                return {
                    self() {
                        return setPath(path);
                    },
                    withId: PagePaths.post(path).withId
                }
            },
            withId(withMainPath: boolean = true, _id: string | number | undefined = ":postId") {
                return withMainPath ?  setPath(firstPath, path, _id) : setPath(firstPath, _id);
            },
            view(withMainPath: boolean = true) {
                let subPath = "view";
                path = withMainPath ?  setPath(firstPath, path, subPath) : setPath(firstPath, subPath);
                return {
                    withTypeId: PagePaths.post(path).withTypeId
                }
            },
        }
    },
    postTerm(firstPath?: string) {
        let path = setPath("postTerm");

        return {
            self() {
                return setPath(path);
            },
            withPostTypeId(withMainPath: boolean = true, postTypeId: string | PostTypeId | undefined = ":postTypeId") {
                path = withMainPath ? setPath(firstPath, path, postTypeId) : setPath(firstPath, postTypeId);
                return {
                    self() {
                        return setPath(path);
                    },
                    withTypeId: PagePaths.postTerm(path).withTypeId
                }
            },
            withTypeId(withMainPath: boolean = true, typeId: string | PostTermTypeId | undefined = ":typeId") {
                path = withMainPath ?  setPath(firstPath, path, typeId) : setPath(firstPath, typeId);
                return {
                    self() {
                        return setPath(path);
                    },
                    withId: PagePaths.postTerm(path).withId
                }
            },
            withId(withMainPath: boolean = true, _id: string | number | undefined = ":termId") {
                return withMainPath ?  setPath(firstPath, path, _id) : setPath(firstPath, _id);
            },
            view(withMainPath: boolean = true) {
                let subPath = "view";
                path = withMainPath ?  setPath(firstPath, path, subPath) : setPath(firstPath, subPath);
                return {
                    withPostTypeId: PagePaths.postTerm(path).withPostTypeId
                }
            },
        }
    },
}

export default PagePaths;