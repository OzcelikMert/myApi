import { Router } from "express";
import {Pages} from "../../utils/service";

import userRouter from "./user.router";
import authRouter from "./auth.router";
import profileRouter from "./profile.router";
import postRouter from "./post.router";
import postTermRouter from "./postTerm.router";
import navigateRouter from "./navigate.router";
import galleryRouter from "./gallery.router";
import seoRouter from "./seo.router";
import settingRouter from "./setting.router";
import languageRouter from "./language.router";
import serverInfoRouter from "./serverInfo.router";
import viewRouter from "./view.router";

const App = Router();

App.use(Pages.auth, authRouter)
App.use(Pages.user, userRouter)
App.use(Pages.profile, profileRouter)
App.use(Pages.post, postRouter)
App.use(Pages.postTerm, postTermRouter)
App.use(Pages.navigate, navigateRouter)
App.use(Pages.gallery, galleryRouter)
App.use(Pages.seo, seoRouter)
App.use(Pages.setting, settingRouter)
App.use(Pages.language, languageRouter)
App.use(Pages.serverInfo, serverInfoRouter)
App.use(Pages.view, viewRouter)

export default App;