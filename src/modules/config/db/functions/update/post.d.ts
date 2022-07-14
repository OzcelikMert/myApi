interface UpdatePostParamDocument {
    postId: number
    statusId?: number
    order?: number
    authorId?: number
    dateStart?: string
    isFixed?: 1 | 0,
}

interface UpdatePostContentParamDocument {
    postId: number,
    langId: number,
    image?: string,
    title?: string,
    shortContent?: string,
    content?: string,
    url?: string,
    seoTitle?: string,
    seoContent?: string,
}

export {
    UpdatePostParamDocument,
    UpdatePostContentParamDocument
};