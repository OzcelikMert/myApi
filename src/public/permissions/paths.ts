import ServicePages from "../../utils/ajax/servicePages";
import PermissionPathDocument from "../../modules/public/permissions/paths";
import {PermissionId, PostTermTypeId, PostTypeId} from "../static";

const PermissionPaths: PermissionPathDocument = {};

PermissionPaths[ServicePages.user] = {
    post: PermissionId.UserAdd,
    put: PermissionId.UserEdit,
    delete: PermissionId.UserDelete
}

PermissionPaths[ServicePages.navigate] = {
    post: PermissionId.NavigateAdd,
    put: PermissionId.NavigateEdit,
    delete: PermissionId.NavigateDelete
}

PermissionPaths[ServicePages.gallery] = {
    post: PermissionId.GalleryEdit,
    delete: PermissionId.GalleryEdit
}

PermissionPaths[ServicePages.seo] = {
    put: PermissionId.SeoEdit
}

PermissionPaths[ServicePages.setting] = {
    put: PermissionId.SettingEdit
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