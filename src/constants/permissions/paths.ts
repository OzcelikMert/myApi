import PermissionPathDocument from "../../types/constants/permissions/paths";
import {PermissionId} from "../permissions";
import {PostTypeId} from "../postTypes";
import ServicePages from "../servicePages";

const PermissionPaths: PermissionPathDocument = {};

PermissionPaths[ServicePages.user] = {
    post: PermissionId.UserAdd,
    put: PermissionId.UserEdit,
    delete: PermissionId.UserDelete
}

PermissionPaths[ServicePages.subscriber] = {
    get: PermissionId.SubscriberEdit,
    delete: PermissionId.SubscriberEdit
}

PermissionPaths[ServicePages.component] = {
    put: PermissionId.ComponentEdit
}

PermissionPaths[ServicePages.gallery] = {
    post: PermissionId.GalleryEdit,
    delete: PermissionId.GalleryEdit
}

PermissionPaths[ServicePages.setting] = {
    put: PermissionId.SettingEdit
}

PermissionPaths[ServicePages.serverInfo] = {
    get: PermissionId.SettingEdit
}

Object.keys(PostTypeId).forEach((postType: any) => {
    let postTypeId = PostTypeId[postType],
        // @ts-ignore
        addPerm: any = PermissionId[`${postType}Add`],
        // @ts-ignore
        editPerm: any = PermissionId[`${postType}Edit`],
        // @ts-ignore
        deletePerm: any = PermissionId[`${postType}Delete`];

    PermissionPaths[`${ServicePages.post}/${postTypeId}`] = {
        post: addPerm,
        put: editPerm,
        delete: deletePerm
    }
    PermissionPaths[`${ServicePages.postTerm}/${postTypeId}`] = {
        post: addPerm,
        put: editPerm,
        delete: deletePerm
    }
})

export default PermissionPaths;