import * as mongoose from "mongoose";
import {SubscriberDocument} from "../types/services/subscriber";

const schema = new mongoose.Schema<SubscriberDocument>(
    {
            email: {type: String, required: true},
    },
    {timestamps: true}
)

export default mongoose.model<SubscriberDocument>("subscribers", schema)