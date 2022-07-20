import Express,{Router} from 'express';
import InitConfig from "./config";
const chalk = require('chalk');
let compression = require('compression');
const bodyParser = require("body-parser");
import cors from "cors";
import routers from "./routers";

import "./library/variable/array"
import "./library/variable/string"
import "./library/variable/number"
import "./library/variable/date"
import "./library/variable/math"

const whitelist = [
    'http://localhost:3000',
];

console.clear()
console.time(`server`)
console.log(chalk.cyan(`\n=========  SERVER LOADING =========`));

const app = Express();

new InitConfig(app).init().then(()=> {
    app.use(Express.json({limit: '2mb'}));
    app.use(bodyParser.json({limit: "2mb"}));
    app.use(bodyParser.urlencoded({limit: "2mb", extended: true, parameterLimit: 10000}));

    app.use(cors({
        origin: function(origin: any, callback: any){
            let originIsWhitelisted = whitelist.indexOf(origin) !== -1;
            callback(null, originIsWhitelisted);
        },
        methods: ['POST', 'PUT', 'GET', "DELETE", 'OPTIONS', 'HEAD'],
        credentials: true,
    }));

    app.use(routers);
    app.use(compression());

    app.listen(8099, () => {
        console.log(chalk.cyan(`=========  SERVER STARTED =========\n`));
        console.timeEnd(`server`)
    });
})


