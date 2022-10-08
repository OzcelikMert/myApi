import {Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../library/api";
import {InferType} from "yup";
import mailerSchema from "../schemas/mailer.schema";
import * as NodeMailer from "nodemailer";
import settingService from "../services/setting.service";

export default {
    set: async (
        req: Request<any>,
        res: Response
    ) => {
        let serviceResult = new Result();
        let data: InferType<typeof mailerSchema.post> = req;

        let setting = (await settingService.select({getContactFormPasswords: true}))[0];
        let contactForm = setting.contactForms?.findSingle("_id", data.body.contactFormId);

        try {
            let transporter = NodeMailer.createTransport({
                host: contactForm?.outGoingServer,
                port: contactForm?.port,
                secure: contactForm?.port == 465,
                auth: {
                    user: contactForm?.email,
                    pass: contactForm?.password
                }
            });

            if(await transporter.verify()){
                let sendMail = await transporter.sendMail({
                    from: contactForm?.email,
                    to: contactForm?.email,
                    subject: contactForm?.name,
                    html: data.body.message,
                    replyTo: data.body.email
                });

                serviceResult.data = {
                    "_id": sendMail.messageId,
                    "response": sendMail.response
                };
            }else {
                serviceResult.status = false;
                serviceResult.statusCode = StatusCodes.conflict;
                serviceResult.errorCode = ErrorCodes.incorrectData;
            }
        }catch (e) {
            serviceResult.status = false;
            serviceResult.statusCode = StatusCodes.conflict;
            serviceResult.errorCode = ErrorCodes.incorrectData;
            serviceResult.customData = e;
        }

        res.status(serviceResult.statusCode).json(serviceResult)
    },
};