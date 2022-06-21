import ErrorCodes from "./errorCodes";
import {CheckErrorCodeFuncDocument} from "../../modules/ajax/";

class Result {
    constructor(
        data: any = [],
        customData: any = null,
        status: boolean = true,
        message: string = "",
        errorCode: number = ErrorCodes.success,
        statusCode: number = 200,
        source: string = ""
    ) {
        this.data = data;
        this.customData = customData;
        this.status = status;
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.source = source;
    }

    data: any;
    customData: any;
    status: boolean;
    message: string;
    errorCode: number;
    statusCode: number;
    source: string | any;

    checkErrorCode(func: CheckErrorCodeFuncDocument): void {
        let errorCode = func();
        this.errorCode = (typeof errorCode === "undefined") ? ErrorCodes.success : errorCode;
        if(this.errorCode !== ErrorCodes.success) this.status = false;
    }
}

export default Result;