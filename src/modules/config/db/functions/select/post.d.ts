interface SelectPostParamDocument {
    postId?: number,
    typeId?: number | number[],
    langId: number,
    statusId?: number,
    getContents?: boolean,
    maxCount?: number
}

export default SelectPostParamDocument;