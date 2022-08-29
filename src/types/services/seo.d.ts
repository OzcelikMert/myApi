export default interface SeoDocument {
    seoContentId: number,
    seoContentLangId: number,
    seoContentTitle: string,
    seoContent: string,
    seoContentTags: string
}

export interface SelectSeoParamDocument {
    langId: number,
}

export interface InsertSeoParamDocument {
    langId: number,
    title?: string,
    content?: string,
    tags?: string[]
}

export interface UpdateSeoParamDocument {
    langId: number
    title?: string
    content?: string
    tags?: string[]
}
