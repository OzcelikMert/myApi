import * as mongoose from "mongoose";
import {StatusId} from "../constants/status.const";
import {UserRoleId} from "../constants/userRole.const";
import {UserDocument} from "../types/services/user";

const schema = new mongoose.Schema<UserDocument>(
    {
        roleId: {type: Number, required: true, enum: UserRoleId},
        statusId: {type: Number, required: true, enum: StatusId},
        image: {type: String, default: ""},
        name: {type: String, default: ""},
        url: {type: String, default: ""},
        comment: {type: String, default: ""},
        phone: {type: String, default: ""},
        email: {type: String, required: true},
        password: {type: String, required: true},
        permissions: {type: [Number], default: []},
        banDateEnd: {type: Date, default: new Date()},
        banComment: {type: String, default: ""},
        facebook: {type: String, default: ""},
        instagram: {type: String, default: ""},
        twitter: {type: String, default: ""},
        views: {type: Number, default: 0},
    },
    {timestamps: true}
).index({roleId: 1, statusId: 1}, {unique: true});

export default mongoose.model("users", schema)