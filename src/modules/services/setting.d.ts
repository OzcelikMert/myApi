export default interface SettingDocument {
    settingId: number,
    settingValue: string
}

export interface SelectSettingParamDocument {
    id?: number,
}

export interface InsertSettingParamDocument {
    id: number,
    value: string
}

export interface UpdateSettingParamDocument {
    id: number,
    value: string
}