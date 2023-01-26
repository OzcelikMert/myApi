import { object, string } from "yup";

export default {
    get: object({
        query: object({
            _id: string(),
        })
    })
};