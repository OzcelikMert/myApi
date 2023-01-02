import {Request, Response} from "express";
import {Result} from "../library/api";
import {lookup} from "geoip-lite";
import {InferType} from "yup";
import viewSchema from "../schemas/view.schema";
import viewService from "../services/view.service";
import {Config} from "../config";
import logMiddleware from "../middlewares/log.middleware";

export default {
    getNumber: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            let date = new Date();
            let dateStart = new Date();
            dateStart.addDays(-7);

            let resData = await viewService.selectTotalWithDate({
                dateStart: dateStart
            });

            let total = 0;

            for (const data of resData) {
                total += data.total;
            }

            let averageTotal = Math.ceil(total / 7);
            let weeklyTotal = total;

            Config.onlineUsers = Config.onlineUsers.filter(onlineUser => date.diffMinutes(onlineUser.updatedAt) < 10);

            serviceResult.data = {
                liveTotal: Config.onlineUsers.length,
                averageTotal: averageTotal,
                weeklyTotal: weeklyTotal
            };

            res.status(serviceResult.statusCode).json(serviceResult);
        });
    },
    getStatistics: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();

            let dateStart = new Date();
            dateStart.addDays(-7);

            serviceResult.data = {
                day: await viewService.selectTotalWithDate({dateStart: dateStart}),
                country: await viewService.selectTotalWithCountry({dateStart: dateStart}),
            };

            res.status(serviceResult.statusCode).json(serviceResult);
        });
    },
    set: async (
        req: Request,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof viewSchema.post> = req;

            let ip = req.ip;
            let ipDetail = lookup(req.ip);

            await viewService.insert({
                ...data.body,
                ip: ip,
                languageId: data.body.lang,
                ...ipDetail
            })

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    }
};