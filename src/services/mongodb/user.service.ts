import * as mongoose from "mongoose";
import {StatusId} from "../../public/static";
import UserFunctions from "../../utils/functions/user";
import V, {DateMask} from "../../library/variable";
import {
    SelectUserParamDocument,
} from "../../modules/services/user";
import userModel, {UserDocument} from "../../model/user.model";

export default {
    async select(params: SelectUserParamDocument): Promise<UserDocument[]> {
        params = V.clearAllData(params);

        let filters: mongoose.FilterQuery<UserDocument> = {
            statusId: { $ne: StatusId.Deleted},
        }

        if (params.email && params.password) {
            filters = {
                ...filters,
                email: params.email,
                password: UserFunctions.encodePassword(params.password)
            }
        } else if (params.userId) {
            filters = {
                ...filters,
                _id: params.userId
            }
        }

        let query = userModel.find(filters, {}, {lean: true});

        return (await query.exec()).map(user => {
            delete user.password;
            return user;
        });
    }
};