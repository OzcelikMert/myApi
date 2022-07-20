export interface InsertNavigateContentParamDocument {
    navigateId: number
    langId: number
    title: string
    url: string
}

export interface DeleteNavigateContentParamDocument {
    navigateId: number
}

export interface UpdateNavigateContentParamDocument {
    navigateId: number
    langId: number
    title?: string
    url?: string
}