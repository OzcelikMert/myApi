import PostContentDocument from "./postContent";

type PostDocument = {
    postId: number,
    postTypeId: number,
    postAuthorId: number,
    postStatusId: number,
    postDateCreate: string,
    postDateStart: string,
    postOrder: number,
    postViews: number,
    postIsFixed: boolean,
} & PostContentDocument
export default PostDocument;

export interface UpdatePostParamDocument {
    postId: number | number[]
    typeId?: number
    statusId?: number
    order?: number
    authorId?: number
    dateStart?: string
    isFixed?: 1 | 0,
}

export interface DeletePostParamDocument {
    postId: number | number[]
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