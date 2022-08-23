import * as mongoose from "mongoose";
import {StatusId} from "../public/static";

export interface UserDocument {
        roleId: number,
        statusId: number,
        image: string,
        name: string,
        comment: string,
        phone: string,
        email: string,
        password: string,
        permissions: number[],
        banDateEnd: string,
        banComment: string,
        facebook: string,
        instagram: string,
        twitter: string,
        views: number,
}

const schema = new mongoose.Schema<UserDocument>(
    {
        roleId: {type: Number, required: true},
        statusId: {type: Number, required: true, enum: StatusId},
        image: {type: String, default: ""},
        name: {type: String, default: ""},
        comment: {type: String, default: ""},
        phone: {type: String, default: ""},
        email: {type: String, required: true},
        password: {type: String, required: true},
        permissions: {type: [Number], default: []},
        banDateEnd: {type: String},
        banComment: {type: String},
        facebook: {type: String, default: ""},
        instagram: {type: String, default: ""},
        twitter: {type: String, default: ""},
        views: {type: Number, default: 0},
    },
    {timestamps: true}
);

export default mongoose.model("users", schema)