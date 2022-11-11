import PagePaths from "../pagePaths";
import {PostTypeId} from "../postTypes";
import {PermissionId} from "../permissions";
import {PermissionPathDocument} from "../../types/constants/permissionPaths";

export default [
    {
        path: PagePaths.postTerm().withPostTypeId(true, PostTypeId.Slider).self(),
        methods: [
            {
                permissionId: PermissionId.SliderAdd,
                method: "POST"
            },
            {
                permissionId: PermissionId.SliderDelete,
                method: "DELETE"
            },
            {
                permissionId: PermissionId.SliderEdit,
                method: "PUT"
            },
        ]
    },
    {
        path: PagePaths.postTerm().withPostTypeId(true, PostTypeId.Page).self(),
        methods: [
            {
                permissionId: PermissionId.PageAdd,
                method: "POST"
            },
            {
                permissionId: PermissionId.PageDelete,
                method: "DELETE"
            },
            {
                permissionId: PermissionId.PageEdit,
                method: "PUT"
            },
        ]
    },
    {
        path: PagePaths.postTerm().withPostTypeId(true, PostTypeId.Blog).self(),
        methods: [
            {
                permissionId: PermissionId.BlogAdd,
                method: "POST"
            },
            {
                permissionId: PermissionId.BlogDelete,
                method: "DELETE"
            },
            {
                permissionId: PermissionId.BlogEdit,
                method: "PUT"
            },
        ]
    },
    {
        path: PagePaths.postTerm().withPostTypeId(true, PostTypeId.Reference).self(),
        methods: [
            {
                permissionId: PermissionId.ReferenceAdd,
                method: "POST"
            },
            {
                permissionId: PermissionId.ReferenceDelete,
                method: "DELETE"
            },
            {
                permissionId: PermissionId.ReferenceEdit,
                method: "PUT"
            },
        ]
    },
    {
        path: PagePaths.postTerm().withPostTypeId(true, PostTypeId.Portfolio).self(),
        methods: [
            {
                permissionId: PermissionId.PortfolioAdd,
                method: "POST"
            },
            {
                permissionId: PermissionId.PortfolioDelete,
                method: "DELETE"
            },
            {
                permissionId: PermissionId.PortfolioDelete,
                method: "PUT"
            },
        ]
    },
    {
        path: PagePaths.postTerm().withPostTypeId(true, PostTypeId.Testimonial).self(),
        methods: [
            {
                permissionId: PermissionId.TestimonialAdd,
                method: "POST"
            },
            {
                permissionId: PermissionId.TestimonialDelete,
                method: "DELETE"
            },
            {
                permissionId: PermissionId.TestimonialEdit,
                method: "PUT"
            },
        ]
    },
    {
        path: PagePaths.postTerm().withPostTypeId(true, PostTypeId.Navigate).self(),
        methods: [
            {
                permissionId: PermissionId.NavigateAdd,
                method: "POST"
            },
            {
                permissionId: PermissionId.NavigateDelete,
                method: "DELETE"
            },
            {
                permissionId: PermissionId.NavigateEdit,
                method: "PUT"
            },
        ]
    }
] as PermissionPathDocument[]