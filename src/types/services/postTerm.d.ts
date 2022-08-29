import PostTermContentDocument from "./postTermContent";

type PostTermDocument = {
    postTermId: number,
    postTermTypeId: number,
    postTermPostTypeId: number,
    postTermMainId: number,
    postTermOrder: number,
    postTermStatusId: number,
    postTermViews: number,
    postTermIsFixed: boolean
} & PostTermContentDocument
export default PostTermDocument;

export interface UpdatePostTermParamDocument {
    termId: number | number[]
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
    mainId?: number
    statusId: number
    order: number
    isFixed: 1 | 0
}

export interface DeletePostTermParamDocument {
    termId: number | number[]
}
