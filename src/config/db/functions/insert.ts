import tables from "../tables";
import db from "../";
import Mysql, {QueryValueTypes} from "../../../library/mysql";
import {StatusId} from "../../../public/static";
import {DateMask} from "../../../library/variable";
import {
    InsertPostContentParamDocument,
    InsertPostParamDocument
} from "../../../modules/config/db/functions/insert/post";
import {
    InsertPostTermContentParamDocument, InsertPostTermLinkParamDocument,
    InsertPostTermParamDocument
} from "../../../modules/config/db/functions/insert/postTerm";
import InsertUserParamDocument from "../../../modules/config/db/functions/insert/user";
import InsertSeoParamDocument from "../../../modules/config/db/functions/insert/seo";
import InsertSettingParamDocument from "../../../modules/config/db/functions/insert/setting";
import {
    InsertNavigateContentParamDocument,
    InsertNavigateParamDocument
} from "../../../modules/config/db/functions/insert/navigate";

const Insert = {
    PostTerm(params: InsertPostTermParamDocument){
        let query = new Mysql(db.conn).insert(tables.PostTerms.TableName)
            .columns(
                tables.PostTerms.typeId,
                tables.PostTerms.postTypeId,
                tables.PostTerms.mainId,
                tables.PostTerms.statusId,
                tables.PostTerms.order,
                tables.PostTerms.isFixed
            ).values(
                {value: params.typeId, valueType: QueryValueTypes.Number},
                {value: params.postTypeId, valueType: QueryValueTypes.Number},
                {value: params.mainId, valueType: QueryValueTypes.Number},
                {value: params.statusId, valueType: QueryValueTypes.Number},
                {value: params.order, valueType: QueryValueTypes.Number},
                {value: params.isFixed, valueType: QueryValueTypes.Number},
            );

        return query.run();
    },
    PostTermContent(params: InsertPostTermContentParamDocument){
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
                {value: params.termId, valueType: QueryValueTypes.Number},
                {value: params.langId, valueType: QueryValueTypes.Number},
                {value: params.image},
                {value: params.title},
                {value: params.url},
                {value: params.seoTitle},
                {value: params.seoContent}
            );

        return query.run();
    },
    PostTermLinks(params: InsertPostTermLinkParamDocument){
        let query = new Mysql(db.conn).insert(tables.PostTermLinks.TableName)
            .columns(
                tables.PostTermLinks.postId,
                tables.PostTermLinks.termId
            ).values(
                {value: params.postId, valueType: QueryValueTypes.Number},
                {value: params.termId, valueType: QueryValueTypes.Number},
            );

        return query.run();
    },
    Post(params: InsertPostParamDocument){
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
                {value: params.typeId, valueType: QueryValueTypes.Number},
                {value: params.statusId, valueType: QueryValueTypes.Number},
                {value: params.order, valueType: QueryValueTypes.Number},
                {value: params.isFixed, valueType: QueryValueTypes.Number},
                {value: params.authorId, valueType: QueryValueTypes.Number},
                {value: new Date(params.dateStart).getStringWithMask(DateMask.DATE)},
                {value: new Date().getStringWithMask(DateMask.DATE)},
            );

        return query.run();
    },
    PostContent(params: InsertPostContentParamDocument){
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
                {value: params.postId, valueType: QueryValueTypes.Number},
                {value: params.langId, valueType: QueryValueTypes.Number},
                {value: params.image},
                {value: params.title},
                {value: params.shortContent},
                {value: params.content},
                {value: params.url},
                {value: params.seoTitle},
                {value: params.seoContent}
            );

        return query.run();
    },
    User(params: InsertUserParamDocument){
        if(params.permissionId === [0]) params.permissionId = [];
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
                {value: params.roleId, valueType: QueryValueTypes.Number},
                {value: params.statusId, valueType: QueryValueTypes.Number},
                {value: params.image},
                {value: params.name},
                {value: params.email},
                {value: params.password},
                {value: JSON.stringify(params.permissionId)},
                {value: params.banDateEnd},
                {value: params.banComment},
            );

        return query.run();
    },
    Seo(params: InsertSeoParamDocument){
        if(params.tags === [""]) params.tags = [];
        let query = new Mysql(db.conn).insert(tables.SeoContents.TableName)
            .columns(
                tables.SeoContents.langId,
                tables.SeoContents.title,
                tables.SeoContents.content,
                tables.SeoContents.tags,
            ).values(
                {value: params.langId, valueType: QueryValueTypes.Number},
                {value: params.title},
                {value: params.content},
                {value: JSON.stringify(params.tags)}
            );

        return query.run();
    },
    Setting(params: InsertSettingParamDocument){
        let query = new Mysql(db.conn).insert(tables.Settings.TableName)
            .columns(
                tables.Settings.id,
                tables.Settings.value
            ).values(
                {value: params.id, valueType: QueryValueTypes.Number},
                {value: params.value},
            );

        return query.run();
    },
    Navigate(params: InsertNavigateParamDocument){
        let query = new Mysql(db.conn).insert(tables.Navigates.TableName)
            .columns(
                tables.Navigates.mainId,
                tables.Navigates.statusId,
                tables.Navigates.order
            ).values(
                {value: params.mainId, valueType: QueryValueTypes.Number},
                {value: params.statusId, valueType: QueryValueTypes.Number},
                {value: params.order, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    NavigateContent(params: InsertNavigateContentParamDocument){
        let query = new Mysql(db.conn).insert(tables.NavigateContents.TableName)
            .columns(
                tables.NavigateContents.navigateId,
                tables.NavigateContents.langId,
                tables.NavigateContents.title,
                tables.NavigateContents.url
            ).values(
                {value: params.navigateId, valueType: QueryValueTypes.Number},
                {value: params.langId, valueType: QueryValueTypes.Number},
                {value: params.title},
                {value: params.url},
            );

        return query.run();
    },
}

export default Insert;