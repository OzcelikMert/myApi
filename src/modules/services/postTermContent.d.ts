export interface UpdatePostTermContentParamDocument {
    termId: number
    langId: number
    image?: string
    title?: string
    url?: string
    seoTitle?: string
    seoContent?: string
}

export interface InsertPostTermContentParamDocument {
    termId: number
    langId: number
    image: string
    title: string
    url: string
    seoTitle: string
    seoContent: string
}

export interface DeletePostTermContentParamDocument {
    termId: number
}
