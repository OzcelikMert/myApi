import Express from "express";
import ExpressSession from "express-session";
import CookieParser from "cookie-parser";
import http from "http";
import https from "https";
import db from "./db";
import Session from "./session";
import {ConfigDocument} from "../modules/config";
const chalk = require('chalk');

let Config: ConfigDocument = {
    app: null,
    passwordSalt: "_@QffsDh14Q",
    publicFolders: [
        ["uploads"]
    ],
    activeUsers: [],
    paths: {
        root: "",
        get services() { return Config.paths.root + "services/" },
        uploads: {
            get images() { return Config.paths.root + "uploads/images/" }
        }
    }
}

class InitConfig{
     constructor(app: any) {
         Config.app = app;
         Config.paths.root = `${require('path').resolve('./')}/src/`;
     }

     init() {
         return new Promise<void>(resolve => {
             this.setPublicFolders();
             this.dbConnect();
             this.setSession();
             this.security();
             resolve()
         });
     }

    private security(){
        http.globalAgent.maxSockets = Infinity;
        https.globalAgent.maxSockets = Infinity;
    }

    private setPublicFolders(){
       console.log(chalk.green('#Public Folders:'))

        Config.publicFolders.forEach((item,index)=>{
            if(item.length === 1){
                Config.app.use(`/${item}`, Express.static(`${Config.paths.root}${item}`));
                console.log(chalk.blue(` - /${item}`) + ` = ${Config.paths.root}${item}`)
            }else{
                Config.app.use(`/${item[0]}`, Express.static(`${Config.paths.root}${item[1]}`));
                console.log(chalk.blue(` - /${item[0]}`) + ` = ${Config.paths.root}${item[1]}`)
            }
        })
    }

    private setSession(){
        Config.app.set('trust proxy', 1)
        Config.app.use(CookieParser());
        Config.app.use(ExpressSession(Session.config))
    }

    private dbConnect(){
        try {
            new db.Create();
            console.log(chalk.green(`#Mysql \n  ${chalk.blue(`- Connected`)}`))
        }catch (e) {
            console.error("Mysql Connection Error")
            console.error(e)
        }
    }
}

export {Config};
export default InitConfig;