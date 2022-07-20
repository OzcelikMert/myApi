import { Router } from "express";
import {ServicePages} from "../../utils/ajax";

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

const App = Router();

App.use(ServicePages.auth, authRouter)
App.use(ServicePages.user, userRouter)
App.use(ServicePages.profile, profileRouter)
App.use(ServicePages.post, postRouter)
App.use(ServicePages.postTerm, postTermRouter)
App.use(ServicePages.navigate, navigateRouter)
App.use(ServicePages.gallery, galleryRouter)
App.use(ServicePages.seo, seoRouter)
App.use(ServicePages.setting, settingRouter)
App.use(ServicePages.language, languageRouter)
App.use(ServicePages.serverInfo, serverInfoRouter)

export default App;