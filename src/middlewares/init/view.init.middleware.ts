import {NextFunction, Request, Response} from "express";
import {Config} from "../../config";
import logMiddleware from "../log.middleware";

export default {
    set: async (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        await logMiddleware.error(req, res, async () => {
            let ip = req.ip;
            let date = new Date();
            let _id = (req.session && req.session.data && req.session.data.id) ? req.session.data.id.toString() : "";

            Config.onlineUsers = Config.onlineUsers.filter(onlineUser => Number(date.diffMinutes(onlineUser.updatedAt)) < 10);

            let findIndex = Config.onlineUsers.indexOfKey("ip", ip);
            if(findIndex > -1){
                Config.onlineUsers[findIndex].updatedAt = date;
                Config.onlineUsers[findIndex]._id = _id;
            }else {
                Config.onlineUsers.push({
                    ip: ip,
                    createdAt: date,
                    updatedAt: date,
                    _id: _id
                })
            }

            next();
        });
    }
};