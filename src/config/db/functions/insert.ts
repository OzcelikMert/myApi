import tables from "../tables";
import db from "../";
import Mysql, {QueryValueTypes} from "../../../library/mysql";
import {StatusId} from "../../../public/static";
import {DateMask} from "../../../library/variable";

const Insert = {
    PostTerm({typeId = 0, postTypeId = 0, mainId = 0, statusId = StatusId.Active, order = 0, isFixed = 0}){
        let query = new Mysql(db.conn).insert(tables.PostTerms.TableName)
            .columns(
                tables.PostTerms.typeId,
                tables.PostTerms.postTypeId,
                tables.PostTerms.mainId,
                tables.PostTerms.statusId,
                tables.PostTerms.order,
                tables.PostTerms.isFixed
            ).values(
                {value: typeId, valueType: QueryValueTypes.Number},
                {value: postTypeId, valueType: QueryValueTypes.Number},
                {value: mainId, valueType: QueryValueTypes.Number},
                {value: statusId, valueType: QueryValueTypes.Number},
                {value: order, valueType: QueryValueTypes.Number},
                {value: isFixed, valueType: QueryValueTypes.Number},
            );

        return query.run();
    },
    PostTermContent({termId = 0, langId = 0, image = "", title = "", url = "", seoTitle = "", seoContent = ""}){
        let query = new Mysql(db.conn).insert(tables.PostTermContents.TableName)
            .columns(
                tables.PostTermContents.termId,
                tables.PostTermContents.langId,
                tables.PostTermContents.image,
                tables.PostTermContents.title,
                tables.PostTermContents.url,
                tables.PostTermContents.seoTitle,
                tables.PostTermContents.seoContent
            ).values(
                {value: termId, valueType: QueryValueTypes.Number},
                {value: langId, valueType: QueryValueTypes.Number},
                {value: image},
                {value: title},
                {value: url},
                {value: seoTitle},
                {value: seoContent}
            );

        return query.run();
    },
    PostTermLinks({postId = 0, termId = 0}){
        let query = new Mysql(db.conn).insert(tables.PostTermLinks.TableName)
            .columns(
                tables.PostTermLinks.postId,
                tables.PostTermLinks.termId
            ).values(
                {value: postId, valueType: QueryValueTypes.Number},
                {value: termId, valueType: QueryValueTypes.Number},
            );

        return query.run();
    },
    Post({typeId = 0, statusId = StatusId.Active, order = 0, authorId = 0, dateStart = "", isFixed = 0}){
        let query = new Mysql(db.conn).insert(tables.Posts.TableName)
            .columns(
                tables.Posts.typeId,
                tables.Posts.statusId,
                tables.Posts.order,
                tables.Posts.isFixed,
                tables.Posts.authorId,
                tables.Posts.dateStart,
                tables.Posts.dateCreate
            ).values(
                {value: typeId, valueType: QueryValueTypes.Number},
                {value: statusId, valueType: QueryValueTypes.Number},
                {value: order, valueType: QueryValueTypes.Number},
                {value: isFixed, valueType: QueryValueTypes.Number},
                {value: authorId, valueType: QueryValueTypes.Number},
                {value: new Date(dateStart).getStringWithMask(DateMask.DATE)},
                {value: new Date().getStringWithMask(DateMask.DATE)},
            );

        return query.run();
    },
    PostContent({postId = 0, langId = 0, image = "", title = "", shortContent = "", content = "", url = "", seoTitle = "", seoContent = ""}){
        let query = new Mysql(db.conn).insert(tables.PostContents.TableName)
            .columns(
                tables.PostContents.postId,
                tables.PostContents.langId,
                tables.PostContents.image,
                tables.PostContents.title,
                tables.PostContents.shortContent,
                tables.PostContents.content,
                tables.PostContents.url,
                tables.PostContents.seoTitle,
                tables.PostContents.seoContent
            ).values(
                {value: postId, valueType: QueryValueTypes.Number},
                {value: langId, valueType: QueryValueTypes.Number},
                {value: image},
                {value: title},
                {value: shortContent},
                {value: content},
                {value: url},
                {value: seoTitle},
                {value: seoContent}
            );

        return query.run();
    },
    User({roleId = 0, statusId = 0, image = "",  name = "", email = "", password = "", permissionId = [0], banDateEnd = "", banComment = ""}){
        if(permissionId === [0]) permissionId = [];
        let query = new Mysql(db.conn).insert(tables.Users.TableName)
            .columns(
                tables.Users.roleId,
                tables.Users.statusId,
                tables.Users.image,
                tables.Users.name,
                tables.Users.email,
                tables.Users.password,
                tables.Users.permissions,
                tables.Users.banDateEnd,
                tables.Users.banComment
            ).values(
                {value: roleId, valueType: QueryValueTypes.Number},
                {value: statusId, valueType: QueryValueTypes.Number},
                {value: image},
                {value: name},
                {value: email},
                {value: password},
                {value: JSON.stringify(permissionId)},
                {value: banDateEnd},
                {value: banComment},
            );

        return query.run();
    },
    Seo({langId = 0, title = "", content = "", tags = [""]}){
        if(tags === [""]) tags = [];
        let query = new Mysql(db.conn).insert(tables.SeoContents.TableName)
            .columns(
                tables.SeoContents.langId,
                tables.SeoContents.title,
                tables.SeoContents.content,
                tables.SeoContents.tags,
            ).values(
                {value: langId, valueType: QueryValueTypes.Number},
                {value: title},
                {value: content},
                {value: JSON.stringify(tags)}
            );

        return query.run();
    },
    Setting({id = 0, value = ""}){
        let query = new Mysql(db.conn).insert(tables.Settings.TableName)
            .columns(
                tables.Settings.id,
                tables.Settings.value
            ).values(
                {value: id, valueType: QueryValueTypes.Number},
                {value: value},
            );

        return query.run();
    },
    Navigate({mainId = 0, statusId = StatusId.Active, order = 0}){
        let query = new Mysql(db.conn).insert(tables.Navigates.TableName)
            .columns(
                tables.Navigates.mainId,
                tables.Navigates.statusId,
                tables.Navigates.order
            ).values(
                {value: mainId, valueType: QueryValueTypes.Number},
                {value: statusId, valueType: QueryValueTypes.Number},
                {value: order, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    NavigateContent({navigateId = 0, langId = 0, title = "", url = ""}){
        let query = new Mysql(db.conn).insert(tables.NavigateContents.TableName)
            .columns(
                tables.NavigateContents.navigateId,
                tables.NavigateContents.langId,
                tables.NavigateContents.title,
                tables.NavigateContents.url
            ).values(
                {value: navigateId, valueType: QueryValueTypes.Number},
                {value: langId, valueType: QueryValueTypes.Number},
                {value: title},
                {value: url},
            );

        return query.run();
    },
}

export default Insert;