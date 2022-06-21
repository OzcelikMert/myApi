import DBFunctions from "../../config/db/functions"
import {SessionDataDocument, SessionDocument} from "../../modules/config";
import {ServiceResult} from "../";
import V, {ClearTypes} from "../../library/variable"
import ErrorCodes from "../../public/ajax/errorCodes";
import {DataCommonDocument} from "../../modules/services";
import Statement from "../../library/statement";
import {SettingId} from "../../public/static";

type DataDocument = {
    settings: {id: number, value: string}[]
} & DataCommonDocument

class Setting {
    public result: ServiceResult = new ServiceResult();
    private readonly data: DataDocument;
    private readonly session: SessionDataDocument;

    constructor(data: any, res: any, session: SessionDocument) {
        this.session = session.data;
        this.data = V.clearAllData(data);
    }

    private set() {
        let savedSettings = DBFunctions.Select.Settings({});
        this.data.settings.forEach(setting => {
            if(savedSettings.length > 0 && savedSettings.findSingle("settingId", setting.id)) {
                DBFunctions.Update.Setting(setting);
            }else {
                DBFunctions.Insert.Setting(setting);
            }
        })
    }

    private checkData(){
        this.result.checkErrorCode(
            () => {
                if(
                    V.isEmpty(
                        this.data.settings,
                    )
                ) return ErrorCodes.emptyValue;

                let settingId = Statement.Foreach(SettingId, (key, value) => {return value;});
                if(
                    this.data.settings.every(setting => !settingId.includes(setting.id))
                ) return ErrorCodes.incorrectData;
            }
        );
    }

    init(): ServiceResult{
        this.checkData();
        if(this.result.status){
            this.set();
        }
        return this.result;
    }
}

export default Setting;