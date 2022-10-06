import { Router } from "express";
import pageConst from "../constants/page.const";

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

const routers = Router();

routers.use(pageConst.Auth, authRouter)
routers.use(pageConst.User, userRouter)
routers.use(pageConst.Profile, profileRouter)
routers.use(pageConst.Post, postRouter)
routers.use(pageConst.PostTerm, postTermRouter)
routers.use(pageConst.Gallery, galleryRouter)
routers.use(pageConst.Setting, settingRouter)
routers.use(pageConst.Language, languageRouter)
routers.use(pageConst.ServerInfo, serverInfoRouter)
routers.use(pageConst.View, viewRouter)
routers.use(pageConst.Mailer, mailerRouter)

export default routers.use("/api", routers);