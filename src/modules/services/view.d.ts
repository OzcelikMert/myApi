export default interface ViewDocument {
    viewId: number
    viewUrl: string
    viewIp: string
    viewCountry: string
    viewCity: string
    viewRegion: string
    viewDate: string
}

export interface ViewTotalDocument {
    total: number
}

export type ViewTotalForDateDocument = {
    total: number
    viewDate: string
}

export type ViewTotalForCountryDocument = {
    total: number
    viewCountry: string
}

export interface InsertViewParamDocument {
    url: string
    lang: string
    ip: string
    country?: string
    city?: string
    region?: string
}

export interface SelectViewParamDocument {
    ip?: string
    lang?: string
    url?: string
    country?: string
    city?: string
    region?: string
    date?: string
    dateStart?: string
    dateEnd?: string
}

export interface DeleteViewParamDocument {
    dateEnd: string
}
