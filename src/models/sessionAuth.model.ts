import * as mongoose from "mongoose";
import userModel from "./user.model";
import {UserRoleId} from "../constants/userRoles";
import {SessionAuthDocument} from "../types/models/sessionAuth";

const schema = new mongoose.Schema<SessionAuthDocument>(
    {
        userId: {type: mongoose.Schema.Types.ObjectId, ref: userModel},
        roleId: {type: Number, required: true, enum: UserRoleId},
        ip: {type: String, default: "", required: true},
        email: {type: String, required: true},
        token: {type: String, default: "", required: true},
        permissions: {type: [Number], default: []},
    },
    {timestamps: true}
)

export default mongoose.model<SessionAuthDocument, mongoose.Model<SessionAuthDocument>>("sessionAuths", schema);