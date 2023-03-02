import {Request, Response} from "express";
import {ErrorCodes, Result, StatusCodes} from "../library/api";
import {InferType} from "yup";
import mailerSchema from "../schemas/mailer.schema";
import * as NodeMailer from "nodemailer";
import settingService from "../services/setting.service";
import MongoDBHelpers from "../library/mongodb/helpers";
import logMiddleware from "../middlewares/log.middleware";

export default {
    set: async (
        req: Request<any>,
        res: Response
    ) => {
        await logMiddleware.error(req, res, async () => {
            let serviceResult = new Result();
            let data: InferType<typeof mailerSchema.post> = req;

            let setting = (await settingService.get({getContactFormPasswords: true}));
            let contactForm = setting.contactForms?.findSingle("_id", MongoDBHelpers.createObjectId(data.body.contactFormId));
            if(contactForm){
                try {
                    let transporter = NodeMailer.createTransport({
                        host: contactForm.outGoingServer,
                        port: contactForm.port,
                        secure: contactForm.port == 465,
                        auth: {
                            user: contactForm.email,
                            pass: contactForm.password
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                    });

                    if(await transporter.verify()){
                        serviceResult.data = [];

                        let sendMail = await transporter.sendMail({
                            from: contactForm.email,
                            to: contactForm.outGoingEmail,
                            subject: contactForm.name,
                            html: data.body.message,
                            replyTo: data.body.email
                        });

                        serviceResult.data.push({
                            "_id": sendMail.messageId,
                            "response": sendMail.response
                        });

                        if(data.body.replyMessage) {
                            let sendMailReply = await transporter.sendMail({
                                from: contactForm.email,
                                to: data.body.email,
                                subject: contactForm.name,
                                html: data.body.replyMessage,
                                replyTo: data.body.email
                            });
                            serviceResult.data.push({
                                "_id": sendMailReply.messageId,
                                "response": sendMailReply.response
                            });
                        }


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
            }else {
                serviceResult.status = false;
                serviceResult.statusCode = StatusCodes.conflict;
                serviceResult.errorCode = ErrorCodes.incorrectData;
            }

            res.status(serviceResult.statusCode).json(serviceResult)
        });
    },
};