export default interface PostTermContentDocument {
    postTermContentId: number,
    postTermContentTermId: number,
    postTermContentLangId: number,
    postTermContentImage: string
    postTermContentTitle: string,
    postTermContentUrl: string,
    postTermContentSEOTitle: string,
    postTermContentSEO: string
}

export interface SelectPostTermContentParamDocument {
    termId: number
    langId: number
}

export interface InsertPostTermContentParamDocument {
    termId: number
    langId: number
    image?: string
    title: string
    url?: string
    seoTitle?: string
    seoContent?: string
}

export interface UpdatePostTermContentParamDocument {
    termId: number
    langId: number
    image?: string
    title?: string
    url?: string
    seoTitle?: string
    seoContent?: string
}

export interface DeletePostTermContentParamDocument {
    termId: number | number[]
}
