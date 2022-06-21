import Express,{Router} from 'express';
import InitConfig from "./config";
const chalk = require('chalk');
let compression = require('compression');
const bodyParser = require("body-parser");
import {ServiceInit, ServiceResult} from "./services/";
import cors from "cors";

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
console.log(chalk.cyan(`\nSERVER LOADING.......`));

const app = Express();
const router: Router = Router();

new InitConfig(app).init().then(()=>{
    router.route("/ajax/:page").all(bodyParser.urlencoded({ extended: true, limit: "2mb", parameterLimit: 10000 }), bodyParser.json(), async (req: Express.Request, res: Express.Response, next: any) => {
        let x = Date.now().toString()
        console.time(x)

        let result = new ServiceResult();

        await (new ServiceInit(req, res)).set(result).then( (result: ServiceResult) => {
            res.status(result.statusCode).send(result);
        });

        console.log(`params:`,req.params);

        next();
        console.timeEnd(x)
    });

    app.use(cors({
        origin: function(origin: any, callback: any){
            var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
            callback(null, originIsWhitelisted);
        },
        methods: ['POST', 'PUT', 'GET', "DELETE", 'OPTIONS', 'HEAD'],
        credentials: true,
    }));

    app.use(router);
    app.use(compression());

    app.listen(8080, () => {
        console.log(chalk.cyan(`========= SERVER STARTED =========\n`));
        console.timeEnd(`server`)
    });
})


