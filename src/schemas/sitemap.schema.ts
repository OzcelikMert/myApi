import { object, string, number } from "yup";
import {ErrorCodes} from "../library/api";

export default {
    getPostTerm: object({
        query: object({
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
            postTypeId: number().required({postTypeId: ErrorCodes.emptyValue}),
            page: number(),
        })
    }),
    getPost: object({
        query: object({
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
            page: number(),
        })
    })
};