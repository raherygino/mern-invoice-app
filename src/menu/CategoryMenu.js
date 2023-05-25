const CategoryMenu = [
    {
        title: "New category",
        icon: "list-check",
        variant: "primary",
        modal: {category: true}
    },
    {
        title: "List category",
        icon: "list",
        variant: "warning",
        modal: {listCategory: true}
    },
    {
        title: "New sub category",
        icon: "edit",
        variant: "danger",
        modal: {subCategory: true}
    },
    {
        title: "List sub category",
        icon: "list",
        variant: "success",
        modal: {listSubCategory: true}
    },
]

export default CategoryMenu