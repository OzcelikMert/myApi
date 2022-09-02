import { object, number, boolean, string, array } from "yup";
import {ErrorCodes} from "../utils/service";

export default {
    get: {
        query: object({
            id: string(),
        })
    }
};