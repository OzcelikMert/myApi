import tables from "../tables";
import db from "../";
import Mysql, {QueryValueTypes} from "../../../library/mysql";
import {UpdateSetDocument} from "../../../library/mysql/modules/queries/update";
import {StatusId} from "../../../public/static";
import V, {DateMask} from "../../../library/variable";

const Update = {
    PostTerm({termId = 0, mainId = -1, statusId = 0,  order = -1, isFixed = -1}){
        const setData: UpdateSetDocument[] = [
            {columnName: tables.PostTerms.statusId, value: statusId, valueType: QueryValueTypes.Number}
        ];

        if(mainId > -1) setData.push({columnName: tables.PostTerms.mainId, value: mainId, valueType: QueryValueTypes.Number});
        if(order > -1) setData.push({columnName: tables.PostTerms.order, value: order, valueType: QueryValueTypes.Number});
        if(isFixed > -1) setData.push({columnName: tables.PostTerms.isFixed, value: isFixed, valueType: QueryValueTypes.Number});

        let query = new Mysql(db.conn).update(tables.PostTerms.TableName)
            .setWithArray(setData)
            .where.equals(
                {columnName: tables.PostTerms.id, value: termId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    PostTermContent({termId = 0, langId = 0, image = "", title = "", url = "", seoTitle = "", seoContent = ""}){
        let query = new Mysql(db.conn).update(tables.PostTermContents.TableName)
            .set(
                {columnName: tables.PostTermContents.image, value: image},
                {columnName: tables.PostTermContents.title, value: title},
                {columnName: tables.PostTermContents.url, value: url},
                {columnName: tables.PostTermContents.seoTitle, value: seoTitle},
                {columnName: tables.PostTermContents.seoContent, value: seoContent}
            ).where.equals(
                {columnName: tables.PostTermContents.termId, value: termId, valueType: QueryValueTypes.Number},
                {columnName: tables.PostTermContents.langId, value: langId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    Post({postId = 0, statusId = StatusId.Active, order = 0, dateStart = "", isFixed = 0}){
        const setData: UpdateSetDocument[] = [
            {columnName: tables.Posts.statusId, value: statusId, valueType: QueryValueTypes.Number}
        ];

        if(!V.isEmpty(dateStart)) setData.push({columnName: tables.Posts.dateStart, value: new Date(dateStart).getStringWithMask(DateMask.DATE)});
        if(order > -1) setData.push({columnName: tables.Posts.order, value: order, valueType: QueryValueTypes.Number});
        if(isFixed > -1) setData.push({columnName: tables.Posts.isFixed, value: isFixed, valueType: QueryValueTypes.Number});

        let query = new Mysql(db.conn).update(tables.Posts.TableName)
            .setWithArray(setData)
            .where.equals(
                {columnName: tables.Posts.id, value: postId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    PostContent({postId = 0, langId = 0, image = "", title = "", shortContent = "", content = "", url = "", seoTitle = "", seoContent = ""}){
        let query = new Mysql(db.conn).update(tables.PostContents.TableName)
            .set(
                {columnName: tables.PostContents.image, value: image},
                {columnName: tables.PostContents.title, value: title},
                {columnName: tables.PostContents.shortContent, value: shortContent},
                {columnName: tables.PostContents.content, value: content},
                {columnName: tables.PostContents.url, value: url},
                {columnName: tables.PostContents.seoTitle, value: seoTitle},
                {columnName: tables.PostContents.seoContent, value: seoContent}
            ).where.equals(
                {columnName: tables.PostContents.postId, value: postId, valueType: QueryValueTypes.Number},
                {columnName: tables.PostContents.langId, value: langId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    User({userId = 0, roleId = 0, statusId = 0, image = "", name = "", email = "", password = "", permissionId = [0], banDateEnd = "", banComment = ""}){
        if(permissionId === [0]) permissionId = [];
        const setData: UpdateSetDocument[] = [
            {columnName: tables.Users.statusId, value: statusId, valueType: QueryValueTypes.Number}
        ];

        if(!V.isEmpty(image)) setData.push({columnName: tables.Users.image, value: image});
        if(!V.isEmpty(name)) setData.push({columnName: tables.Users.name, value: name});
        if(!V.isEmpty(email)) setData.push({columnName: tables.Users.email, value: email});
        if(!V.isEmpty(password)) setData.push({columnName: tables.Users.password, value: password});
        if(!V.isEmpty(banDateEnd)) setData.push({columnName: tables.Users.banDateEnd, value: new Date(banDateEnd).getStringWithMask(DateMask.DATE)});
        if(!V.isEmpty(banComment)) setData.push({columnName: tables.Users.banComment, value: banComment});
        if(roleId > 0) setData.push({columnName: tables.Users.roleId, value: roleId, valueType: QueryValueTypes.Number});
        if(permissionId !== [0]) setData.push({columnName: tables.Users.permissions, value: JSON.stringify(permissionId)});

        let query = new Mysql(db.conn).update(tables.Users.TableName)
            .setWithArray(setData).where.equals(
                {columnName: tables.Users.id, value: userId, valueType: QueryValueTypes.Number},
            );

        return query.run();
    },
    Seo({langId = 0, title = "", content = "", tags = [""]}){
        if(tags === [""]) tags = [];
        let query = new Mysql(db.conn).update(tables.SeoContents.TableName)
            .set(
                {columnName: tables.SeoContents.title, value: title},
                {columnName: tables.SeoContents.content, value: content},
                {columnName: tables.SeoContents.tags, value: JSON.stringify(tags)}
            ).where.equals(
                {columnName: tables.SeoContents.langId, value: langId, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
    Setting({id = 0, value = ""}){
        let query = new Mysql(db.conn).update(tables.Settings.TableName)
            .set(
                {columnName: tables.Settings.value, value: value}
            ).where.equals(
                {columnName: tables.Settings.id, value: id, valueType: QueryValueTypes.Number}
            );

        return query.run();
    },
}

export default Update;