export default interface NavigateDocument {
    navigateId: number,
    navigateMainId: number,
    navigateOrder: number,
    navigateStatusId: number,
    // Content
    navigateContentId: number,
    navigateContentNavigateId: number,
    navigateContentLangId: number,
    navigateContentTitle: string,
    navigateContentUrl: string,
}

export interface InsertNavigateParamDocument {
    mainId: number
    statusId: number
    order: number
}

export interface DeleteNavigateParamDocument {
    navigateId: number
}


export interface SelectNavigateParamDocument {
    navigateId?: number,
    langId: number,
    statusId?: number,
    getContents?: boolean
}

export interface UpdateNavigateParamDocument {
    navigateId: number
    mainId?: number
    statusId?: number
    order?: number
}
