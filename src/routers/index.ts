import { Router } from "express";

import userRouter from "./routes/user.router";
import authRouter from "./routes/auth.router";
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
import sitemapRouter from "./routes/sitemap.router";
import PagePaths from "../constants/pagePaths";
import navigationRouter from "./routes/navigation.router";

const routers = Router();

routers.use(PagePaths.auth(), authRouter)
routers.use(PagePaths.user().self(), userRouter)
routers.use(PagePaths.gallery(), galleryRouter)
routers.use(PagePaths.language().self(), languageRouter)
routers.use(PagePaths.serverInfo(), serverInfoRouter)
routers.use(PagePaths.subscriber().self(), subscriberRouter)
routers.use(PagePaths.view().self(), viewRouter)
routers.use(PagePaths.mailer(), mailerRouter)
routers.use(PagePaths.sitemap().self(), sitemapRouter)
routers.use(PagePaths.setting().self(), settingRouter)
routers.use(PagePaths.component().self(), componentRouter)
routers.use(PagePaths.post().self(), postRouter)
routers.use(PagePaths.postTerm().self(), postTermRouter)
routers.use(PagePaths.navigation().self(), navigationRouter)

export default routers;