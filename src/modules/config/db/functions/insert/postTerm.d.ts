interface InsertPostTermParamDocument {
    typeId: number
    postTypeId: number
    mainId: number
    statusId: number
    order: number
    isFixed: 1 | 0
}

interface InsertPostTermContentParamDocument {
    termId: number
    langId: number
    image: string
    title: string
    url: string
    seoTitle: string
    seoContent: string
}

interface InsertPostTermLinkParamDocument {
    postId: number
    termId: number
}

export {
    InsertPostTermParamDocument,
    InsertPostTermContentParamDocument,
    InsertPostTermLinkParamDocument
};