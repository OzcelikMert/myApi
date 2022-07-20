import { Router } from "express";
import {Config} from "../config";

import App from "./app";

const routers = Router();

routers.use("/ajax", App);

export default routers;