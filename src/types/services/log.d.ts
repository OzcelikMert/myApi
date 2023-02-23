import {LogDocument} from "../models/log";

export type LogAddParamDocument = {} & Omit<LogDocument, "_id">