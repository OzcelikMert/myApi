import SitemapTypeIndex from "./typeIndex";
import {
    SitemapChildrenDocument,
    SitemapChildrenJsonDocument,
    SitemapDocument, SitemapJsonDocument
} from "../types/sitemap";
import fs from "fs";
import SitemapFolderPaths from "./paths";
import * as path from "path";

export default class Sitemap extends SitemapTypeIndex {
    private readonly fileName?: string;
    constructor(fileName?: string) {
        super();
        this.fileName = fileName;
    }

    private get getHead(): SitemapDocument {
        return {
            urlset: {
                $: {
                    xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
                    "xmlns:xsd": "http://www.w3.org/2001/XMLSchema",
                    "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                    "xmlns:xhtml": "http://www.w3.org/1999/xhtml"
                }
            }
        }
    }

    private codeConverter(code: number): string {
        return `00${code.toString()}`;
    }

    private getName(fileCode: string, withPath?: true) {
        let fileName = `sitemap${this.fileName ? `-${this.fileName}` : ""}-${fileCode}.json`;
        return withPath ? path.resolve(SitemapFolderPaths.main, fileName) : fileName;
    }

    private async getLastCode(): Promise<string> {
        let code = this.codeConverter(1);
        let fileName = this.getName(code);

        await new Promise(resolve => {
            fs.readdir(SitemapFolderPaths.main, async (err, files) => {
                files = files ?? [];

                if(this.fileName){
                    files = files.filter(file => file.search(fileName) > -1);
                }

                if (files.length > 0) {
                    fileName = files[files.length - 1];

                    let matchedCode = fileName.match(/(?<code>[0-9]{1,9})/g);
                    if (matchedCode && matchedCode.length > 0) {
                        code = matchedCode[0];
                        let json = await new Promise<SitemapJsonDocument>(resolve => {
                            fs.readFile(this.getName(code, true), "utf8", (err, data) => {
                                resolve(JSON.parse(data))
                            });
                        });
                        if (json.urlset.url && json.urlset.url.length > 500) {
                            code = this.codeConverter(Number.parseInt(code) + 1);
                        }
                    }
                }

                resolve(0);
            })
        })

        return this.codeConverter(Number.parseInt(code));
    }

    private async create(fileCode: string) {
        let json = this.getHead;

        await new Promise(resolve => {
            fs.writeFile(this.getName(fileCode, true), JSON.stringify(json), "utf8",function (err) {
                resolve(0)
            })
        })

        await this.addRowIndex([{loc: this.getName(fileCode).replace(".json", ".xml")}])
    }

    private async check(fileCode: string) {
        return fs.existsSync(this.getName(fileCode, true))
    }

    async addRow(data: SitemapChildrenJsonDocument[], fileCode?: string) {
        let lastCode = fileCode ?? await this.getLastCode();
        if (await this.check(lastCode)) {
            let json = await new Promise<SitemapJsonDocument>(resolve => {
                fs.readFile(this.getName(lastCode, true), "utf8", (err, data) => {
                    resolve(JSON.parse(data))
                });
            });

            if (typeof json.urlset.url === "undefined") {
                json.urlset.url = [];
            }

            json.urlset.url = json.urlset.url.concat(data)

            await new Promise(resolve => {
                fs.writeFile(this.getName(lastCode, true), JSON.stringify(json), function (err) {
                    resolve(0)
                })
            })

        } else {
            await this.create(lastCode);
            lastCode = await this.addRow(data, lastCode);
        }
        return lastCode;
    }

    async updateRow(fileCode: string, _id: string, data: SitemapChildrenJsonDocument) {
        if (await this.check(fileCode)) {
            let json = await new Promise<SitemapJsonDocument>(resolve => {
                fs.readFile(this.getName(fileCode, true), "utf8", function (err, data) {
                    resolve(JSON.parse(data))
                });
            });

            if (typeof json.urlset.url === "undefined") {
                json.urlset.url = [];
            }

            let find = json.urlset.url.findSingle("_id", _id);
            console.log(fileCode, _id, data);

            if (find) {
                let xHtmlLink = (find["xhtml:link"] ?? []);
                let xHtmlLinkData = (data["xhtml:link"] ?? []);
                xHtmlLinkData.map((dataLink, index) => {
                    let findLink = xHtmlLink.findSingle("$.hreflang", dataLink.$.hreflang);
                    if(findLink){
                        findLink = Object.assign(findLink, dataLink);
                        xHtmlLinkData.remove(index);
                    }
                })

                console.log(xHtmlLink, xHtmlLinkData)
                find = Object.assign(find, {
                    ...data,
                    ...(data["xhtml:link"] ? {"xhtml:link": xHtmlLink.concat(xHtmlLinkData)} : {})
                });
                find.lastmod = new Date().toISOString();

                await new Promise(resolve => {
                    fs.writeFile(this.getName(fileCode, true), JSON.stringify(json), function (err) {
                        resolve(0)
                    })
                })
            }
        }
    }

    async deleteRow(fileCode: string, _id: string) {
        if (await this.check(fileCode)) {
            let json = await new Promise<SitemapJsonDocument>(resolve => {
                fs.readFile(this.getName(fileCode, true), "utf8", function (err, data) {
                    resolve(JSON.parse(data))
                });
            });

            if (typeof json.urlset.url === "undefined") {
                json.urlset.url = [];
            }

            json.urlset.url = json.urlset.url.filter(url => url._id !== _id);

            await new Promise(resolve => {
                fs.writeFile(this.getName(fileCode, true), JSON.stringify(json), function (err) {
                    resolve(0)
                })
            })
        }
    }
}