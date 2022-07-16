import {SessionDataDocument, SessionDocument} from "../../modules/config";
import {ServiceResult} from "../";
import {DataCommonDocument} from "../../modules/services";
import os from "os";
import osu from "node-os-utils";
import checkDiskSpace from "check-disk-space";

type DataDocument = {

} & DataCommonDocument

class ServerDetail {
    public result: ServiceResult = new ServiceResult();
    private readonly data: DataDocument;
    private readonly session: SessionDataDocument;

    constructor(req: any, res: any, session: SessionDocument) {
        this.session = session.data;
        this.data = req.body;
    }

    private async get() {
        let cpu = await osu.cpu.usage();
        let diskSpace = await checkDiskSpace('D:/');
        this.result.data = {
            cpu: cpu.toFixed(2),
            memory: (100 - (100/os.totalmem()) * os.freemem()).toFixed(2),
            storage: (100 - ((diskSpace.free * 100) / diskSpace.size)).toFixed(2)
        }
    }

    private checkData(){}

    init(): Promise<ServiceResult>{
        this.checkData();
        return new Promise(async resolve => {
            if(this.result.status){
                await this.get();
            }
            resolve(this.result)
        })
    }
}

export default ServerDetail;