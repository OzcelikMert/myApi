export default interface PostTermDocument {
    postTermId: number,
    postTermTypeId: number,
    postTermPostTypeId: number,
    postTermMainId: number,
    postTermOrder: number,
    postTermStatusId: number,
    postTermViews: number,
    postTermIsFixed: boolean
    // Content
    postTermContentId: number,
    postTermContentTermId: number,
    postTermContentLangId: number,
    postTermContentImage: string
    postTermContentTitle: string,
    postTermContentUrl: string,
    postTermContentSEOTitle: string,
    postTermContentSEO: string
}

export interface UpdatePostTermParamDocument {
    termId: number
    postTypeId?: number,
    typeId?: number
    mainId?: number
    statusId?: number
    order?: number
    isFixed?: 1 | 0
}

export interface SelectPostTermParamDocument {
    termId?: number,
    postTypeId?: number,
    typeId?: number,
    langId: number,
    statusId?: number,
    getContents?: boolean,
    url?: string
}

export interface InsertPostTermParamDocument {
    typeId: number
    postTypeId: number
    mainId: number
    statusId: number
    order: number
    isFixed: 1 | 0
}

export interface DeletePostTermParamDocument {
    termId: number
}
