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

            let dateStart = new Date();
            dateStart.addDays(-7);

            let resData = await viewService.getTotalWithDate({
                dateStart: dateStart
            });

            let total = 0;

            for (const data of resData) {
                total += data.total;
            }

            let averageTotal = Math.ceil(total / 7);
            let weeklyTotal = total;

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
                day: await viewService.getTotalWithDate({dateStart: dateStart}),
                country: await viewService.getTotalWithCountry({dateStart: dateStart}),
            };

            res.status(serviceResult.statusCode).json(serviceResult);
        });
    },
    add: async (
        req: Request,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof viewSchema.post> = req;

            let ip = req.ip;
            let ipDetail = lookup(req.ip);

            let insertData = await viewService.add({
                ...data.body,
                ip: ip,
                ...ipDetail
            })

            serviceResult.data = {_id: insertData._id};

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
};