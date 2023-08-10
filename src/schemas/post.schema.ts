import {object, string, number, boolean, array, mixed} from "yup";
import {ErrorCodes} from "../library/api";
import {ProductTypeId} from "../constants/productTypes";

const postBody = object({
    statusId: number().required({statusId: ErrorCodes.emptyValue}),
    pageTypeId: number(),
    categories: array(string().required({categories: ErrorCodes.incorrectData})).default(undefined),
    tags: array(string().required({tags: ErrorCodes.incorrectData})).default(undefined),
    dateStart: string().required({dateStart: ErrorCodes.emptyValue}),
    rank: number().required({rank: ErrorCodes.emptyValue}),
    isFixed: boolean().default(false),
    siteMap: string().default(undefined),
    contents: object({
        langId: string().required({langId: ErrorCodes.emptyValue}),
        title: string().min(3, {title: ErrorCodes.incorrectData}).required({title: ErrorCodes.emptyValue}),
        image: string(),
        icon: string(),
        url: string(),
        content: string(),
        shortContent: string(),
        buttons: array(object({
            title: string().required({title: ErrorCodes.emptyValue}),
            url: string()
        })).default(undefined)
    }).required({contents: ErrorCodes.emptyValue}),
    beforeAndAfter: object({
        imageBefore: string().required({imageBefore: ErrorCodes.emptyValue}),
        imageAfter: string().required({imageBefore: ErrorCodes.emptyValue}),
        images: array(string().required({images: ErrorCodes.incorrectData})).default([]),
    }).default(undefined),
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
            variations: array(string().required({variationId: ErrorCodes.incorrectData})).default([]),
        }).required({attributes: ErrorCodes.incorrectData})).default([]),
        variations: array(object({
            selectedVariations: array(object({
                attributeId: string().required({attributeId: ErrorCodes.emptyValue}),
                variationId: string().required({variationId: ErrorCodes.emptyValue}),
            }).required({variations: ErrorCodes.incorrectData})).default([]),
            images: array(string().required({images: ErrorCodes.incorrectData})).default([]),
            rank: number().required({rank: ErrorCodes.emptyValue}),
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
    getOne: object({
        params: object({
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        query: object({
            _id: string(),
            langId: string(),
            url: string(),
            pageTypeId: number(),
            statusId: number(),
        })
    }),
    getMany: object({
        query: object({
            typeId: array(number().required({typeId: ErrorCodes.incorrectData})).default(undefined),
            _id: array(string().required({_id: ErrorCodes.incorrectData})).default(undefined),
            pageTypeId: array(number().required({typeId: ErrorCodes.incorrectData})).default(undefined),
            langId: string(),
            title: string(),
            statusId: number(),
            count: number(),
            page: number(),
            ignoreDefaultLanguage: boolean(),
            isRecent: boolean(),
            categories: array(string().required({categories: ErrorCodes.incorrectData})).default(undefined),
        })
    }),
    getCount: object({
        params: object({
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        query: object({
            statusId: number(),
            categories: array(string().required({categories: ErrorCodes.incorrectData})).default(undefined),
            title: string(),
        })
    }),
    post: object({
        params: object({
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        body: postBody
    }),
    putOne: object({
        params: object({
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
            _id: string().required({_id: ErrorCodes.emptyValue}),
        }),
        body: postBody
    }),
    putManyStatus: object({
        params: object({
            typeId: number().required({typeId: ErrorCodes.emptyValue})
        }),
        body: object({
            _id: array(string().required({_id: ErrorCodes.incorrectData})).required({_id: ErrorCodes.emptyValue}),
            statusId: number().required({statusId: ErrorCodes.emptyValue})
        })
    }),
    putOneRank: object({
        params: object({
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
            _id: string().required({_id: ErrorCodes.emptyValue}),
        }),
        body: object({
            rank: number().required({rank: ErrorCodes.emptyValue})
        })
    }),
    putOneView: object({
        params: object({
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
            _id: string().required({_id: ErrorCodes.emptyValue}),
        }),
        body: object({
            langId: string().required({langId: ErrorCodes.emptyValue})
        })
    }),
    deleteMany: object({
        params: object({
            typeId: number().required({typeId: ErrorCodes.emptyValue}),
        }),
        body: object({
            _id: array(string().required({_id: ErrorCodes.incorrectData})).required({_id: ErrorCodes.emptyValue}),
        })
    })
};