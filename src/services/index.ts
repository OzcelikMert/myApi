import Express from "express";
import ServiceResult from "../public/ajax/result";
import {Config} from "../config";
import ServicePages from "../public/ajax/servicePages";
import {SessionController} from "../controllers";
import User from "../library/user";
import ErrorCodes from "../public/ajax/errorCodes";

class ServiceInit {
    req: Express.Request;
    res: Express.Response;

    constructor(req: Express.Request, res: Express.Response) {
        this.req = req;
        this.res = res;
    }

    public set(result = new ServiceResult()) : Promise<ServiceResult>{
        let wait = false;
        return new Promise( (resolve) => {
            // Check Session
            if(!result.status){
                resolve(result);
            }

            let method = this.req.method,
                page = this.req.params.page,
                session: any = this.req.session,
                data = (this.req.method === "GET") ? this.req.query : this.req.body,
                service = null,
                path = Config.paths.services + `${method.toLowerCase()}/${page}`;
            data.ip = User.getIP(this.req);
            
            try {
                // Check Permission
                if(
                    method === "POST" ||
                    method === "DELETE" ||
                    method === "PUT"
                ) {
                    if(!SessionController.isThere(this.req)){
                        result.status = false;
                        result.errorCode = ErrorCodes.notLoggedIn;
                        resolve(result);
                    }
                }

                if(
                    (method === "POST" && page === ServicePages.gallery) ||
                    (method === "DELETE" && page === ServicePages.gallery)
                ) {
                    wait = true;
                    service = new (require(path).default)(this.req, this.res, session);
                    service.init().then((r: ServiceResult) => {
                        resolve(r)
                    });
                }else{
                    service = new (require(path).default)(data, this.res, session);
                    result = service.init();
                    result.source = `${method.toLowerCase()}/${page}`;
                    resolve(result);
                }
            } catch (error) {
                result.status = false;
                result.message = page + ` is wrong ajax page!` + error;
                result.statusCode = 500;
                result.errorCode =  ErrorCodes.notFound;
                resolve(result);
            }
        });
    }
}

export {ServiceInit, ServiceResult};