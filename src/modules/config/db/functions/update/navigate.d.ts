interface UpdateNavigateParamDocument {
    navigateId: number
    mainId?: number
    statusId?: number
    order?: number
}

interface UpdateNavigateContentParamDocument {
    navigateId: number
    langId: number
    title?: string
    url?: string
}

export {
    UpdateNavigateParamDocument,
    UpdateNavigateContentParamDocument
};