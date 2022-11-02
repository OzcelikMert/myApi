export type SitemapChildrenJsonDocument = {
    _id?: string
} & SitemapChildrenDocument

export type SitemapJsonDocument = {
    urlset: {
        $?: SitemapAttrDocument
        url?: SitemapChildrenJsonDocument[]
    }
} & Omit<SitemapDocument, "urlset">

export interface SitemapAttrDocument {
    "xmlns:xsi"?: string
    "xmlns:xsd"?: string
    "xmlns"?: string
    "xmlns:xhtml"?: string
}

export interface SitemapChildrenDocument {
    loc?: string,
    lastmod?: string,
    changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never",
    priority?: string
    "xhtml:link"?: {
        $: {
            rel: "alternate",
            hreflang: string,
            href: string
        }
    }[]
}

export interface SitemapDocument {
    urlset: {
        $?: SitemapAttrDocument
        url?: SitemapChildrenDocument[]
    }
}