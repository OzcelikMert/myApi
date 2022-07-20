export default interface PostTermLinkDocument {
    postTermLinkId: number,
    postTermLinkPostId: number,
    postTermLinkTermId: number
}

export interface DeletePostTermLinkParamDocument {
    postId?: number
    termId?: number
}

export interface InsertPostTermLinkParamDocument {
    postId: number
    termId: number
}
