export default interface PostDocument {
    postId: number,
    postTypeId: number,
    postAuthorId: number,
    postStatusId: number,
    postDateCreate: string,
    postDateStart: string,
    postOrder: number,
    postViews: number,
    postIsFixed: boolean,
    // Content
    postContentId: number,
    postContentTags: string,
    postContentPostId: number,
    postContentLangId: number,
    postContentImage: string,
    postContentTitle: string,
    postContent: string,
    postContentShort: string,
    postContentUrl: string,
    postContentSEOTitle: string,
    postContentSEO: string
    postTermContents: string
}

export interface UpdatePostParamDocument {
    postId: number
    typeId?: number
    statusId?: number
    order?: number
    authorId?: number
    dateStart?: string
    isFixed?: 1 | 0,
}

export interface DeletePostParamDocument {
    postId: number
}

export interface InsertPostParamDocument {
    typeId: number,
    statusId: number,
    order: number,
    authorId: number,
    dateStart: string,
    isFixed: 1 | 0,
}

export interface SelectPostParamDocument {
    postId?: number,
    typeId?: number | number[],
    langId: number,
    url?: string
    statusId?: number,
    getContents?: boolean,
    maxCount?: number
}