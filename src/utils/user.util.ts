import Crypto from "crypto";
import {Config} from "../config";

export default {
    encodePassword(password: string) : string {
        return Crypto.createHash('sha256').update(Config.passwordSalt + password).digest('hex')
    }
};