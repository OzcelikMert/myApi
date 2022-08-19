import NavigateContentDocument from "./navigateContent";

type NavigateDocument = {
    navigateId: number,
    navigateMainId: number,
    navigateOrder: number,
    navigateStatusId: number,
} & NavigateContentDocument
export default NavigateDocument

export interface InsertNavigateParamDocument {
    mainId?: number
    statusId: number
    order: number
}

export interface DeleteNavigateParamDocument {
    navigateId: number | number[]
}


export interface SelectNavigateParamDocument {
    navigateId?: number,
    langId: number,
    statusId?: number,
    getContents?: boolean
}

export interface UpdateNavigateParamDocument {
    navigateId: number | number[]
    mainId?: number
    statusId?: number
    order?: number
}
