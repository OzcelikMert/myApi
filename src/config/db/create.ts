import db from "./index"
import tables from "./tables"
const MysqlSync = require('sync-mysql')

class Create {
    constructor() {
        let affectedRows = this.createDatabase();
        db.conn = new MysqlSync(db.auth);
        this.createTables();
        this.createContentTables();
        if(affectedRows > 0) this.addIndexKeys();
    }

    private createDatabase(): number {
        return new MysqlSync(db.authWithoutDBName).query(`CREATE DATABASE IF NOT EXISTS ${db.auth.database} CHARACTER SET utf8 COLLATE utf8_general_ci;`).affectedRows;
    }

    private createTables(): void {
        db.conn.query(`CREATE TABLE IF NOT EXISTS ${tables.Users.TableName} (
                ${tables.Users.id} BIGINT PRIMARY KEY AUTO_INCREMENT,
                ${tables.Users.roleId} INT,
                ${tables.Users.statusId} INT,
                ${tables.Users.name} VARCHAR(100),
                ${tables.Users.email} VARCHAR(100),
                ${tables.Users.password} VARCHAR(150),
                ${tables.Users.image} TEXT,
                ${tables.Users.permissions} JSON,
                ${tables.Users.banDateEnd} VARCHAR(20),
                ${tables.Users.banComment} TEXT
            );`);
        db.conn.query(`CREATE TABLE IF NOT EXISTS ${tables.Posts.TableName} (
                ${tables.Posts.id} BIGINT PRIMARY KEY AUTO_INCREMENT,
                ${tables.Posts.typeId} INT,
                ${tables.Posts.authorId} BIGINT,
                ${tables.Posts.statusId} INT,
                ${tables.Posts.dateCreate} VARCHAR(20),
                ${tables.Posts.dateStart} VARCHAR(20),
                ${tables.Posts.order} INT,
                ${tables.Posts.views} INT,
                ${tables.Posts.isFixed} BOOLEAN
            );`);
        db.conn.query(`CREATE TABLE IF NOT EXISTS ${tables.PostTerms.TableName} (
                ${tables.PostTerms.id} BIGINT PRIMARY KEY AUTO_INCREMENT,
                ${tables.PostTerms.typeId} INT,
                ${tables.PostTerms.postTypeId} INT,
                ${tables.PostTerms.mainId} BIGINT,
                ${tables.PostTerms.statusId} INT,
                ${tables.PostTerms.order} INT,
                ${tables.PostTerms.views} INT,
                ${tables.PostTerms.isFixed} BOOLEAN
            );`);
        db.conn.query(`CREATE TABLE IF NOT EXISTS ${tables.PostTermLinks.TableName} (
                ${tables.PostTermLinks.id} BIGINT PRIMARY KEY AUTO_INCREMENT,
                ${tables.PostTermLinks.postId} BIGINT,
                ${tables.PostTermLinks.termId} BIGINT
            );`);
        db.conn.query(`CREATE TABLE IF NOT EXISTS ${tables.Settings.TableName} (
                ${tables.Settings.id} BIGINT PRIMARY KEY AUTO_INCREMENT,
                ${tables.Settings.value} JSON
            );`);
        db.conn.query(`CREATE TABLE IF NOT EXISTS ${tables.Languages.TableName} (
                ${tables.Languages.id} BIGINT PRIMARY KEY AUTO_INCREMENT,
                ${tables.Languages.image} TEXT,
                ${tables.Languages.shortKey} VARCHAR(3),
                ${tables.Languages.title} VARCHAR(20)
            );`);
    }

    private createContentTables(): void {
        db.conn.query(`CREATE TABLE IF NOT EXISTS ${tables.PostContents.TableName} (
                ${tables.PostContents.id} BIGINT PRIMARY KEY AUTO_INCREMENT,
                ${tables.PostContents.postId} BIGINT,
                ${tables.PostContents.langId} INT,
                ${tables.PostContents.image} TEXT,
                ${tables.PostContents.title} TEXT,
                ${tables.PostContents.content} TEXT,
                ${tables.PostContents.shortContent} TEXT,
                ${tables.PostContents.url} TEXT,
                ${tables.PostContents.seoTitle} TEXT,
                ${tables.PostContents.seoContent} TEXT
            );`);
        db.conn.query(`CREATE TABLE IF NOT EXISTS ${tables.PostTermContents.TableName} (
                ${tables.PostTermContents.id} BIGINT PRIMARY KEY AUTO_INCREMENT,
                ${tables.PostTermContents.termId} BIGINT,
                ${tables.PostTermContents.langId} INT,
                ${tables.PostTermContents.image} TEXT,
                ${tables.PostTermContents.title} TEXT,
                ${tables.PostTermContents.url} TEXT,
                ${tables.PostTermContents.seoTitle} TEXT,
                ${tables.PostTermContents.seoContent} TEXT
            );`);
        db.conn.query(`CREATE TABLE IF NOT EXISTS ${tables.SeoContents.TableName} (
                ${tables.SeoContents.id} BIGINT PRIMARY KEY AUTO_INCREMENT,
                ${tables.SeoContents.langId} INT,
                ${tables.SeoContents.title} TEXT,
                ${tables.SeoContents.content} TEXT,
                ${tables.SeoContents.tags} TEXT
            );`);
    }

    private addIndexKeys(): void {
        db.conn.query(`ALTER TABLE ${tables.Users.TableName} ADD INDEX(${tables.Users.roleId},${tables.Users.statusId});`);
        db.conn.query(`ALTER TABLE ${tables.Posts.TableName} ADD INDEX(${tables.Posts.typeId},${tables.Posts.authorId},${tables.Posts.statusId});`);
        db.conn.query(`ALTER TABLE ${tables.PostTerms.TableName} ADD INDEX(${tables.PostTerms.typeId},${tables.PostTerms.postTypeId},${tables.PostTerms.mainId},${tables.PostTerms.statusId});`);
        db.conn.query(`ALTER TABLE ${tables.PostTermLinks.TableName} ADD INDEX(${tables.PostTermLinks.postId},${tables.PostTermLinks.termId});`);
        // Contents
        db.conn.query(`ALTER TABLE ${tables.PostContents.TableName} ADD INDEX(${tables.PostContents.postId},${tables.PostContents.langId});`);
        db.conn.query(`ALTER TABLE ${tables.PostTermContents.TableName} ADD INDEX(${tables.PostTermContents.termId},${tables.PostTermContents.langId});`);
        db.conn.query(`ALTER TABLE ${tables.SeoContents.TableName} ADD INDEX(${tables.SeoContents.langId});`);
    }
}

export default Create;