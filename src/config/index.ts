import Express from "express";
import ExpressSession from "express-session";
import CookieParser from "cookie-parser";
import http from "http";
import https from "https";
import Session from "./session";
import {ConfigDocument} from "../types/config";
import dbConnect from "./db";
import userService from "../services/user.service";
import {UserRoleId} from "../constants/userRoles";
import {StatusId} from "../constants/status";
import languageService from "../services/language.service";
import settingService from "../services/setting.service";
import * as path from "path"
import {generate} from "generate-password";
import chalk from "chalk";
import {PostDocument} from "../types/services/post";

let Config: ConfigDocument = {
    app: null,
    passwordSalt: "_@QffsDh14Q",
    publicFolders: [
        ["uploads"]
    ],
    onlineUsers: [],
    paths: {
        root: "",
        uploads: {
            get images() {
                return path.resolve(Config.paths.root, "uploads", "images");
            }
        }
    },
    defaultLangId: ""
}

class InitConfig {
    constructor(app: any) {
        Config.app = app;
        Config.paths.root = `${path.resolve('./', "src")}`;
    }

    init() {
        return new Promise<void>(async resolve => {
            this.setPublicFolders();
            this.setSession();
            this.security();
            await this.mongodbConnect();
            await this.checkSuperAdminUser();
            await this.checkLanguages();
            await this.checkSettings();
            resolve()
        });
    }

    private security() {
        http.globalAgent.maxSockets = Infinity;
        https.globalAgent.maxSockets = Infinity;
    }

    private setPublicFolders() {
        console.log(chalk.green('#Public Folders'))

        Config.publicFolders.forEach((item, index) => {
            if (item.length === 1) {
                Config.app.use(`/${item}`, Express.static(path.resolve(Config.paths.root, item[0])));
                console.log(chalk.blue(` - /${item}`) + ` = ${path.resolve(Config.paths.root, item[0])}`)
            } else {
                Config.app.use(`/${item[0]}`, Express.static(path.resolve(Config.paths.root, item[1])));
                console.log(chalk.blue(` - /${item[0]}`) + ` = ${path.resolve(Config.paths.root, item[1])}`)
            }
        })
    }

    private setSession() {
        Config.app.set('trust proxy', 1)
        Config.app.use(CookieParser(Session.sessionConfig.secret));
        Config.app.use(ExpressSession(Session.sessionConfig))
    }

    private async mongodbConnect() {
        try {
            await dbConnect();
            console.log(chalk.green(`#MongoDB`))
            console.log(chalk.blue(`- Created`))
        } catch (e) {
            console.error("MongoDB Connection Error")
            console.error(e)
        }
    }

    private async checkSuperAdminUser() {
        if ((await userService.select({roleId: UserRoleId.SuperAdmin})).length === 0) {
            let password = generate({
                length: 10
            })
            await userService.insert({
                name: "Super Admin",
                email: "admin@admin.com",
                statusId: StatusId.Active,
                password: password,
                roleId: UserRoleId.SuperAdmin,
                permissions: []
            })
            console.log(chalk.green(`#Admin Account`))
            console.log(chalk.blue(`- Created`))
            console.log(chalk.blue(`- ${password}`))
        }
    }

    private async checkLanguages() {
        if ((await languageService.select({})).length === 0) {
            await languageService.insert({
                title: "English",
                image: "gb.webp",
                shortKey: "en",
                locale: "us",
                statusId: StatusId.Active
            })
            console.log(chalk.green(`#Language`))
            console.log(chalk.blue(`- Created`))
        }
    }

    private async checkSettings() {
        let settings = await settingService.select({});
        if (settings.length === 0) {
            let lang = await languageService.select({});
            await settingService.insert({
                defaultLangId: lang[0]._id.toString(),
            });
            Config.defaultLangId = lang[0]._id.toString();
            console.log(chalk.green(`#Setting`))
            console.log(chalk.blue(`- Created`))
        } else {
            Config.defaultLangId = settings[0].defaultLangId.toString();
        }
    }
}

export {Config};
export default InitConfig;