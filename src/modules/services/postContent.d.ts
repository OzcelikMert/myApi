export default interface PostContentDocument {
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

export interface SelectPostContentParamDocument {
    postId: number
    langId: number
}

export interface InsertPostContentParamDocument {
    postId: number,
    langId: number,
    image?: string,
    title: string,
    shortContent?: string,
    content?: string,
    url?: string,
    seoTitle?: string,
    seoContent?: string,
}

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
    postId: number | number[]
}