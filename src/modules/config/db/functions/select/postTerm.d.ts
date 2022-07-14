interface SelectPostTermParamDocument {
    termId?: number,
    postTypeId?: number,
    typeId?: number,
    langId: number,
    statusId?: number,
    getContents?: boolean
}

export default SelectPostTermParamDocument;