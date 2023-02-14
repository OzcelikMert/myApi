import {object, string, number, boolean, array, mixed, SchemaOf} from "yup";
import {ErrorCodes} from "../library/api";
import {ProductTypeId} from "../constants/productTypes";

const postBody = object({
    statusId: number().required({statusId: ErrorCodes.emptyValue}),
    pageTypeId: number(),
    terms: array(string().required({terms: ErrorCodes.incorrectData})).default([]),
    dateStart: string().required({dateStart: ErrorCodes.emptyValue}),
    order: number().required({order: ErrorCodes.emptyValue}),
    isFixed: boolean().default(false),
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
        typeId: number().default(ProductTypeId.SimpleProduct),
        images: array(string().required({images: ErrorCodes.incorrectData})).default([]),
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
            width: string().default(""),
            height: string().default(""),
            depth: string().default(""),
            weight: string().default(""),
        }).default(undefined),
        attributes: array(object({
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
            attributeId: string().required({attributeId: ErrorCodes.emptyValue}),
            variationId: array(string().required({variationId: ErrorCodes.incorrectData})).default([]),
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
                width: string().default(""),
                height: string().default(""),
                depth: string().default(""),
                weight: string().default(""),
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
            title: string(),
            pageTypeId: number(),
            statusId: number(),
            getContents: boolean().default(false),
            count: number()
        }),
    }),
    getCount: object({
        query: object({
            typeId: array(number().required({typeId: ErrorCodes.incorrectData})),
        })
    }),
    get: object({
        params: object({
            _id: string(),
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        query: object({
            langId: string(),
            getContents: boolean().default(false),
            url: string(),
            title: string(),
            pageTypeId: number(),
            statusId: number(),
            count: number(),
            page: number(),
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
            _id: string().required({_id: ErrorCodes.emptyValue}),
        }),
        body: postBody
    }),
    putStatus: object({
        params: object({
            typeId: number().required({typeId: ErrorCodes.emptyValue})
        }),
        body: object({
            _id: array(string().required({_id: ErrorCodes.incorrectData})).required({_id: ErrorCodes.emptyValue}),
            statusId: number().required({statusId: ErrorCodes.emptyValue})
        })
    }),
    putView: object({
        params: object({
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
            _id: string().required({_id: ErrorCodes.emptyValue}),
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
            _id: array(string().required({_id: ErrorCodes.incorrectData})).required({_id: ErrorCodes.emptyValue}),
        })
    })
};