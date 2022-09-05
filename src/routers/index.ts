import { Router } from "express";
import {Config} from "../config";

import App from "./app";

const routers = Router();

routers.use("/api", App);

export default routers;