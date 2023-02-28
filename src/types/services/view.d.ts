import {ViewDocument} from "../models/view";

export interface ViewDeleteManyParamDocument {
    dateEnd: Date
}

export interface ViewGetParamDocument {
    ip?: string
    langId?: string
    url?: string
    country?: string
    city?: string
    region?: string
    dateStart?: Date
    dateEnd?: Date
}

export interface ViewAddParamDocument {
    url: string,
    langId: string
    ip: string,
    country?: string,
    city?: string,
    region?: string
}

export type ViewGetTotalResultDocument = {
    total: number
    _id: string
}

export type ViewGetResultDocument = {} & ViewDocument