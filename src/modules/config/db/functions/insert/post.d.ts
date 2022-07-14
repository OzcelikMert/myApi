interface InsertPostParamDocument {
    typeId: number,
    statusId: number,
    order: number,
    authorId: number,
    dateStart: string,
    isFixed: 1 | 0,
}

interface InsertPostContentParamDocument {
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

export {
    InsertPostParamDocument,
    InsertPostContentParamDocument
};