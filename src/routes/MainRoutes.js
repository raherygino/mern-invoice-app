import LayoutMaster from "../components/layout/LayoutMaster"
import NewProduct from "../pages/products/NewProduct"
import ListProducts from "../pages/products/ListProducts"
import ShowProduct from "../pages/products/ShowProduct"
import NewInvoice from "../pages/invoices/NewInvoice"
import Invoices from "../pages/invoices/Invoices"
import NotFound from "../pages/notFound/index"
import UploadFile from "../pages/uploadFile/UploadFile"

const MainRoutes = {
    path: '/',
    element: <LayoutMaster />,
    children: [
        {
            name: 'New product',
            path: '/new_product',
            element: <NewProduct />
        },
        {
            name: 'Upload',
            path: '/upload_file',
            element: <UploadFile />
        },
        {
            name: 'All products',
            path: '/products',
            element: <ListProducts />
        },
        {
            name: 'show_product',
            path: '/products/show/:id',
            element: <ShowProduct />
        },
        {
            name: 'edit_product',
            path: '/products/edit/:id',
            element: <NewProduct />
        },
        {
            name: 'New invoice',
            path: '/new_invoice',
            element: <NewInvoice />
        },
        {
            name: 'All invoices',
            path: '/invoices',
            element: <Invoices />
        },
        {
            name: 'not_found',
            path: '/*',
            element: <NotFound />
        },
    ]
}

export default MainRoutes