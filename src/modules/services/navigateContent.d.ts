export default interface NavigateContentDocument {
    navigateContentId: number,
    navigateContentNavigateId: number,
    navigateContentLangId: number,
    navigateContentTitle: string,
    navigateContentUrl: string,
}

export interface SelectNavigateContentParamDocument {
    navigateId: number
    langId: number
}

export interface InsertNavigateContentParamDocument {
    navigateId: number
    langId: number
    title: string
    url?: string
}

export interface DeleteNavigateContentParamDocument {
    navigateId: number | number[]
}

export interface UpdateNavigateContentParamDocument {
    navigateId: number
    langId: number
    title?: string
    url?: string
}