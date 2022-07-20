export interface UpdatePostContentParamDocument {
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

export interface DeletePostContentParamDocument {
    postId: number
}

export interface InsertPostContentParamDocument {
    postId: number,
    langId: number,
    image: string,
    title: string,
    shortContent: string,
    content: string,
    url: string,
    seoTitle: string,
    seoContent: string,
}