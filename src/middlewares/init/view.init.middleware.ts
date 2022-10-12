import {NextFunction, Request, Response} from "express";
import {InferType} from "yup";
import {Config} from "../../config";

export default {
    set: async (
        req: Request<any>,
        res: Response,
        next: NextFunction
    ) => {
        let ip = req.ip;
        let date = new Date();
        let _id = (req.session && req.session.data && req.session.data.id) ? req.session.data.id.toString() : "";

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

        Config.onlineUsers.forEach( (onlineUser, index) => {
            if(date.diffMinutes(onlineUser.updatedAt) > 10 ){
                Config.onlineUsers.remove(index);
            }
        })

        next();
    }
};