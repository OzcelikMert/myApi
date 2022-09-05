import PermissionPathDocument from "../../types/constants/permissions/paths";
import pageConst from "../page.const";
import {PermissionId} from "../permission.const";
import {PostTypeId} from "../postType.const";

const PermissionPaths: PermissionPathDocument = {};

PermissionPaths[pageConst.User] = {
    post: PermissionId.UserAdd,
    put: PermissionId.UserEdit,
    delete: PermissionId.UserDelete
}

PermissionPaths[pageConst.Navigate] = {
    post: PermissionId.NavigateAdd,
    put: PermissionId.NavigateEdit,
    delete: PermissionId.NavigateDelete
}

PermissionPaths[pageConst.Gallery] = {
    post: PermissionId.GalleryEdit,
    delete: PermissionId.GalleryEdit
}

PermissionPaths[pageConst.Setting] = {
    put: PermissionId.SettingEdit
}

PermissionPaths[pageConst.ServerInfo] = {
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

    PermissionPaths[`${pageConst.Post}/${postTypeId}`] = {
        post: addPerm,
        put: editPerm,
        delete: deletePerm
    }
    PermissionPaths[`${pageConst.PostTerm}/${postTypeId}`] = {
        post: addPerm,
        put: editPerm,
        delete: deletePerm
    }
})

export default PermissionPaths;