import {Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../library/api";
import {lookup} from "geoip-lite";
import {InferType} from "yup";
import viewSchema from "../schemas/view.schema";
import viewService from "../services/view.service";
import {Config} from "../config";

export default {
    getNumber: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        let serviceResult = new Result();

        let dateStart = new Date();
        dateStart.addDays(-7);

        let resData = await viewService.selectTotal({
            dateStart: dateStart
        });

        let averageTotal = Math.ceil(resData.total / 7);
        let weeklyTotal = resData.total;

        serviceResult.data = {
            liveTotal: Config.onlineUsers.length,
            averageTotal: averageTotal,
            weeklyTotal: weeklyTotal
        };

        res.status(serviceResult.statusCode).json(serviceResult);
    },
    getStatistics: async (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        let serviceResult = new Result();

        let dateStart = new Date();
        dateStart.addDays(-7);

        serviceResult.data = {
            day: await viewService.selectTotalWithDate({dateStart: dateStart}),
            country: await viewService.selectTotalWithCountry({dateStart: dateStart}),
        };

        res.status(serviceResult.statusCode).json(serviceResult);
    },
    set: async (
        req: Request,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof viewSchema.post> = req;

        let ip = req.ip;
        let ipDetail = lookup(req.ip);

        serviceResult.data = await viewService.insert({
            ...data.body,
            ip: ip,
            languageId: data.body.lang,
            ...ipDetail
        })

        res.status(serviceResult.statusCode).json(serviceResult)
    }
};