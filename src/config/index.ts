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

import fs from "fs";
import pagePathUtil from "../utils/pagePath.util";

let Config: ConfigDocument = {
    app: null,
    passwordSalt: "_@QffsDh14Q",
    publicFolders: [
        ["uploads"],
        ["uploads", "flags"],
        ["uploads", "images"],
        ["uploads", "static"],
        ["uploads", "video"]
    ],
    onlineUsers: [],
    paths: {
        root: "",
        uploads: {
            get images() {return path.resolve(Config.paths.root, "uploads", "images");},
            get flags() {return path.resolve(Config.paths.root, "uploads", "flags");},
            get video() {return path.resolve(Config.paths.root, "uploads", "video");},
            get static() {return path.resolve(Config.paths.root, "uploads", "static");}
        }
    },
    defaultLangId: ""
}

class InitConfig {
    constructor(app: any) {
        Config.app = app;
        Config.paths.root = path.resolve('./', "src");
    }

    async init() {
        return new Promise<void>(async resolve => {
            this.setPublicFolders();
            this.setSession();
            this.security();
            await this.mongodbConnect();
            await this.checkSuperAdminUser();
            await this.checkLanguages();
            await this.checkSettings();
            resolve();
        });
    }

    private security() {
        http.globalAgent.maxSockets = Infinity;
        https.globalAgent.maxSockets = Infinity;
    }

    private setPublicFolders() {
        console.log(chalk.green("#Public Folders"));

        Config.publicFolders.forEach((publicFolder, index) => {
            let folderPath = "";

            publicFolder.forEach(publicFolderPath => {
                folderPath = pagePathUtil.setPath(folderPath, publicFolderPath);
            });
            folderPath = folderPath.slice(1);

            if(!fs.existsSync(path.resolve(Config.paths.root, folderPath))){
                fs.mkdirSync(path.resolve(Config.paths.root, folderPath));
            }

            Config.app.use(`/${folderPath}`, Express.static(path.resolve(Config.paths.root, folderPath)));
            console.log(chalk.blue(` - /${folderPath}`) + ` : ${path.resolve(Config.paths.root, folderPath)}`)
        });
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
            console.log(chalk.blue(`- Connected`))
        } catch (e) {
            console.error("MongoDB Connection Error")
            console.error(e)
        }
    }

    private async checkSuperAdminUser() {
        if (!(await userService.getOne({roleId: UserRoleId.SuperAdmin}))) {
            let password = generate({
                length: 10
            })
            await userService.add({
                name: "Super Admin",
                email: "admin@admin.com",
                statusId: StatusId.Active,
                password: password,
                roleId: UserRoleId.SuperAdmin,
                permissions: []
            })
            console.log(chalk.green(`#Admin Account`))
            console.log(chalk.blue(`- Created`))
            console.log(chalk.blue(`- Password: ${password}`))
        }
    }

    private async checkLanguages() {
        if (!(await languageService.getOne({}))) {
            await languageService.add({
                title: "English",
                image: "gb.webp",
                shortKey: "en",
                locale: "us",
                statusId: StatusId.Active,
                rank: -1
            })
            console.log(chalk.green(`#Language`))
            console.log(chalk.blue(`- Created`))
        }
    }

    private async checkSettings() {
        let settings = await settingService.get({});
        if (!settings) {
            let lang = await languageService.getOne({});
            await settingService.add({
                contactForms: [],
                staticLanguages: [],
                socialMedia: [],
                defaultLangId: lang?._id?.toString() || "",
            });
            Config.defaultLangId = lang?._id?.toString() || "";
            console.log(chalk.green(`#Setting`))
            console.log(chalk.blue(`- Created`))
        } else {
            Config.defaultLangId = settings.defaultLangId.toString();
        }
    }
}

export {Config};
export default InitConfig;