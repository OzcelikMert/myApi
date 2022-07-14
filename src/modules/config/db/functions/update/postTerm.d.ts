interface UpdatePostTermParamDocument {
    termId: number
    mainId?: number
    statusId?: number
    order?: number
    isFixed?: 1 | 0
}

interface UpdatePostTermContentParamDocument {
    termId: number
    langId: number
    image?: string
    title?: string
    url?: string
    seoTitle?: string
    seoContent?: string
}

export {
    UpdatePostTermParamDocument,
    UpdatePostTermContentParamDocument
};