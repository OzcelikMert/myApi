import Express from 'express';
import InitConfig from "./config";
const chalk = require('chalk');
let compression = require('compression');
const bodyParser = require("body-parser");
import cors from "cors";
import routers from "./routers";
import config from "config";
import responseTime from "response-time";

import "./library/variable/array"
import "./library/variable/string"
import "./library/variable/number"
import "./library/variable/date"
import "./library/variable/math"
import viewInitMiddleware from "./middlewares/init/view.init.middleware";
import {sessionMiddleware} from "./middlewares/validates";
import PagePaths from "./constants/pagePaths";
import PermissionPaths from "./constants/permissionsPaths";

const host = config.get("serverHost") as string;
const port = config.get("serverPort") as number;

const whitelist = config.get("whiteList") as string[];

console.clear()
console.time(`server`)
console.log(chalk.cyan(`\n=========  SERVER LOADING =========`));

const app = Express();

new InitConfig(app).init().then(()=> {
    app.use(Express.json({limit: '2mb'}));
    app.use(bodyParser.json({limit: "2mb"}));
    app.use(bodyParser.urlencoded({limit: "2mb", extended: true, parameterLimit: 10000}));

    app.use(cors({
        origin: whitelist,
        methods: ['POST', 'PUT', 'GET', "DELETE", 'OPTIONS', 'HEAD'],
        credentials: true,
    }));

    app.use(responseTime());
    app.use([viewInitMiddleware.set, sessionMiddleware.reload], routers);
    app.use(compression());

    app.listen(port, host, () => {
        console.log(chalk.cyan(`=========  SERVER STARTED =========\n`));
        console.timeEnd(`server`)
    });
})


