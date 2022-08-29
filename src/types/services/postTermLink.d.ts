export default interface PostTermLinkDocument {
    postTermLinkId: number,
    postTermLinkPostId: number,
    postTermLinkTermId: number
}

export interface DeletePostTermLinkParamDocument {
    postId?: number | number[]
    termId?: number | number[]
}

export interface InsertPostTermLinkParamDocument {
    postId: number
    termId: number
}
