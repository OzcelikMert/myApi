import { Router } from "express";
import ServicePages from "../constants/servicePages";

import userRouter from "./routes/user.router";
import authRouter from "./routes/auth.router";
import profileRouter from "./routes/profile.router";
import postRouter from "./routes/post.router";
import postTermRouter from "./routes/postTerm.router";
import galleryRouter from "./routes/gallery.router";
import settingRouter from "./routes/setting.router";
import languageRouter from "./routes/language.router";
import serverInfoRouter from "./routes/serverInfo.router";
import viewRouter from "./routes/view.router";
import mailerRouter from "./routes/mailer.router";
import subscriberRouter from "./routes/subscriber.router";
import componentRouter from "./routes/component.router";

const routers = Router();

routers.use(ServicePages.auth, authRouter)
routers.use(ServicePages.user, userRouter)
routers.use(ServicePages.profile, profileRouter)
routers.use(ServicePages.post, postRouter)
routers.use(ServicePages.postTerm, postTermRouter)
routers.use(ServicePages.gallery, galleryRouter)
routers.use(ServicePages.setting, settingRouter)
routers.use(ServicePages.language, languageRouter)
routers.use(ServicePages.serverInfo, serverInfoRouter)
routers.use(ServicePages.view, viewRouter)
routers.use(ServicePages.mailer, mailerRouter)
routers.use(ServicePages.subscriber, subscriberRouter)
routers.use(ServicePages.component, componentRouter)

export default routers.use("/api", routers);