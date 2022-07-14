interface InsertNavigateParamDocument {
    mainId: number
    statusId: number
    order: number
}

interface InsertNavigateContentParamDocument {
    navigateId: number
    langId: number
    title: string
    url: string
}

export {
    InsertNavigateParamDocument,
    InsertNavigateContentParamDocument
};