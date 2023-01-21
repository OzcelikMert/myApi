import {object, string, number, boolean, array, mixed} from "yup";
import {ErrorCodes} from "../library/api";

const postBody = object({
    mainId: string(),
    statusId: number().required({statusId: ErrorCodes.emptyValue}),
    pageTypeId: number(),
    terms: array(string().required({termId: ErrorCodes.incorrectData})).default([]),
    dateStart: string().required({dateStart: ErrorCodes.emptyValue}),
    order: number().required({order: ErrorCodes.emptyValue}),
    isFixed: number().is([1, 0], {isFixed: ErrorCodes.incorrectData}),
    siteMap: string().default(undefined),
    contents: object({
        langId: string().required({langId: ErrorCodes.emptyValue}),
        title: string().default(""),
        seoContent: string(),
        image: string(),
        icon: string(),
        seoTitle: string(),
        url: string(),
        content: string(),
        shortContent: string(),
        buttons: array(object({
            title: string().required({title: ErrorCodes.emptyValue}),
            url: string()
        })).default(undefined)
    }).required({contents: ErrorCodes.emptyValue}),
    components: array(string().required({components: ErrorCodes.incorrectData})).default([]),
    eCommerce: object({
        typeId: number(),
        pricing: object({
            taxRate: number().default(0),
            taxExcluded: number().default(0),
            taxIncluded: number().default(0),
            compared: number().default(0),
            shipping: number().default(0),
        }).default(undefined),
        inventory: object({
            sku: string().default(""),
            quantity: number().default(0),
            isManageStock: boolean().default(false)
        }).default(undefined),
        shipping: object({
            width: number().default(0),
            height: number().default(0),
            depth: number().default(0),
            weight: number().default(0),
        }).default(undefined),
        attributes: array(object({
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
            attributeId: string().required({attributeId: ErrorCodes.emptyValue}),
            variations: array(string().required({variations: ErrorCodes.incorrectData})).default([]),
        }).required({attributes: ErrorCodes.incorrectData})).default([]),
        variations: array(object({
            selectedVariations: array(object({
                attributeId: string().required({attributeId: ErrorCodes.emptyValue}),
                variationId: string().required({variationId: ErrorCodes.emptyValue}),
            }).required({variations: ErrorCodes.incorrectData})).default([]),
            images: array(string().required({images: ErrorCodes.incorrectData})).default([]),
            order: number().required({order: ErrorCodes.emptyValue}),
            pricing: object({
                taxRate: number().default(0),
                taxExcluded: number().default(0),
                taxIncluded: number().default(0),
                compared: number().default(0),
                shipping: number().default(0),
            }).required({pricing: ErrorCodes.emptyValue}),
            inventory: object({
                sku: string().default(""),
                quantity: number().default(0),
                isManageStock: boolean().default(false)
            }).required({inventory: ErrorCodes.emptyValue}),
            shipping: object({
                width: number().default(0),
                height: number().default(0),
                depth: number().default(0),
                weight: number().default(0),
            }).required({shipping: ErrorCodes.emptyValue}),
            contents: object({
                langId: string().required({langId: ErrorCodes.emptyValue}),
                image: string(),
                content: string(),
                shortContent: string(),
            }).required({contents: ErrorCodes.emptyValue})
        }).required({variationItems: ErrorCodes.incorrectData})).default([]),
        variationDefaults: array(object({
            attributeId: string().required({attributeId: ErrorCodes.emptyValue}),
            variationId: string().required({variationId: ErrorCodes.emptyValue}),
        }).required({variationDefaults: ErrorCodes.incorrectData})).default([]),
    }).default(undefined)
})

export default {
    getGeneral: object({
        query: object({
            langId: string(),
            typeId: array(number().required({typeId: ErrorCodes.incorrectData})),
            url: string(),
            pageTypeId: number(),
            statusId: number(),
            getContents: number().is([1], {getContents: ErrorCodes.incorrectData}).default(undefined),
            maxCount: number()
        }),
    }),
    get: object({
        params: object({
            postId: string(),
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        query: object({
            langId: string(),
            getContents: number().is([1], {getContents: ErrorCodes.incorrectData}).default(undefined),
            url: string(),
            pageTypeId: number(),
            statusId: number(),
            maxCount: number(),
            isPrimary: boolean()
        })
    }),
    post: object({
        params: object({
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        body: postBody
    }),
    put: object({
        params: object({
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
            postId: string().required({postId: ErrorCodes.emptyValue}),
        }),
        body: postBody
    }),
    putStatus: object({
        params: object({
            typeId: number().required({typeId: ErrorCodes.emptyValue})
        }),
        body: object({
            postId: array(string().required({postId: ErrorCodes.incorrectData})).required({postId: ErrorCodes.emptyValue}),
            statusId: number().required({statusId: ErrorCodes.emptyValue})
        })
    }),
    putView: object({
        params: object({
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
            postId: string().required({postId: ErrorCodes.emptyValue}),
        }),
        body: object({
            url: string().default(""),
            langId: string().required({langId: ErrorCodes.emptyValue})
        })
    }),
    delete: object({
        params: object({
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        body: object({
            postId: array(string().required({postId: ErrorCodes.incorrectData})).required({postId: ErrorCodes.emptyValue}),
        })
    })
};