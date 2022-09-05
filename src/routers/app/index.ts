import { Router } from "express";
import pageConst from "../../constants/page.const";

import userRouter from "./routes/user.router";
import authRouter from "./routes/auth.router";
import profileRouter from "./routes/profile.router";
import postRouter from "./routes/post.router";
import postTermRouter from "./routes/postTerm.router";
import navigateRouter from "./routes/navigate.router";
import galleryRouter from "./routes/gallery.router";
import settingRouter from "./routes/setting.router";
import languageRouter from "./routes/language.router";
import serverInfoRouter from "./routes/serverInfo.router";
import viewRouter from "./routes/view.router";

const App = Router();

App.use(pageConst.Auth, authRouter)
App.use(pageConst.User, userRouter)
App.use(pageConst.Profile, profileRouter)
App.use(pageConst.Post, postRouter)
App.use(pageConst.PostTerm, postTermRouter)
App.use(pageConst.Navigate, navigateRouter)
App.use(pageConst.Gallery, galleryRouter)
App.use(pageConst.Setting, settingRouter)
App.use(pageConst.Language, languageRouter)
App.use(pageConst.ServerInfo, serverInfoRouter)
App.use(pageConst.View, viewRouter)

export default App;