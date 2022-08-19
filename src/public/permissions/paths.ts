import Pages from "../../utils/service/pages";
import PermissionPathDocument from "../../modules/public/permissions/paths";
import {PermissionId, PostTermTypeId, PostTypeId} from "../static";

const PermissionPaths: PermissionPathDocument = {};

PermissionPaths[Pages.user] = {
    post: PermissionId.UserAdd,
    put: PermissionId.UserEdit,
    delete: PermissionId.UserDelete
}

PermissionPaths[Pages.navigate] = {
    post: PermissionId.NavigateAdd,
    put: PermissionId.NavigateEdit,
    delete: PermissionId.NavigateDelete
}

PermissionPaths[Pages.gallery] = {
    post: PermissionId.GalleryEdit,
    delete: PermissionId.GalleryEdit
}

PermissionPaths[Pages.seo] = {
    put: PermissionId.SeoEdit
}

PermissionPaths[Pages.setting] = {
    put: PermissionId.SettingEdit
}

PermissionPaths[Pages.serverInfo] = {
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

    PermissionPaths[`${Pages.post}/${postTypeId}`] = {
        post: addPerm,
        put: editPerm,
        delete: deletePerm
    }
    PermissionPaths[`${Pages.postTerm}/${postTypeId}`] = {
        post: addPerm,
        put: editPerm,
        delete: deletePerm
    }
})

export default PermissionPaths;