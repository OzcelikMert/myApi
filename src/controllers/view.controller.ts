import {Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../utils/service";
import {lookup} from "geoip-lite";
import {InferType} from "yup";
import viewSchema from "../schemas/view.schema";
import viewService from "../services/view.service";
import {Config} from "../config";

export default {
    getNumber: (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        let serviceResult = new Result();

        let dateStart = new Date();
        dateStart.addDays(-7);

        let resData = viewService.selectTotal({
            dateStart: dateStart.toLocaleString()
        });

        let averageTotal = 0;
        let weeklyTotal = 0;

        if(resData.length > 0) {
            averageTotal = Math.ceil(resData[0].total / 7);
            weeklyTotal = resData[0].total;
        }

        serviceResult.data = {
            liveTotal: Config.activeUsers.length,
            averageTotal: averageTotal,
            weeklyTotal: weeklyTotal
        };

        res.status(serviceResult.statusCode).json(serviceResult);
    },
    getStatistics: (
        req: Request<any, any, any, any>,
        res: Response
    ) => {
        let serviceResult = new Result();

        let dateStart = new Date();
        dateStart.addDays(-7);
        let dateStartString = dateStart.toLocaleString();

        serviceResult.data = {
            day: viewService.selectTotalForDate({dateStart: dateStartString}),
            country: viewService.selectTotalForCountry({dateStart: dateStartString}),
        };

        res.status(serviceResult.statusCode).json(serviceResult);
    },
    set: (
        req: Request,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof viewSchema.post> = req;

        let ip = req.ip;
        let ipDetail = lookup(req.ip);

        serviceResult.data = viewService.insert({
            ip: ip,
            ...data.body,
            ...ipDetail
        })

        res.status(serviceResult.statusCode).json(serviceResult)
    }
};