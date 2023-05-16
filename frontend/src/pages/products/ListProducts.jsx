import BreadCrumb from "../../components/layout/BreadCrumb"
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import { useDispatch, useSelector } from "react-redux"
import { getProducts, reset } from "../../features/products/productSlice"
import { Link, useNavigate } from "react-router-dom"
import Spinner from "../../components/Spinner"
import { useEffect } from "react"
import columnsProducts from "../../components/datatables/columns/columnsProducts"
import TableData from "../../components/datatables"

const ListProducts = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { products, get } = useSelector(
        (state) => state.products
    )

    const handleShow = (item) => {
        navigate(`/products/show/${item._id}`)
    }
    
    const handleEdit = (item) => {
        navigate(`/products/edit/${item._id}`)
    }

    const columns = columnsProducts(handleShow, handleEdit)
    const data = []

    for (let i = 0; i < products.length ; i++) {
        data.push(products[i])
    }

    useEffect(() => {
        dispatch(getProducts())
        return () => {
            dispatch(reset())
        }
    }, [dispatch])

    const onSuccess = () => {
        dispatch(getProducts())
    }

    return(
        <>
        { get.isLoading ? <Spinner /> : null }
            <BreadCrumb title="Products">
                <Link className="btn btn-light-primary" to="/new_product">Add new product</Link>
            </BreadCrumb>
            
            <Container className="mt-6">
                <Card>
                    <Card.Body className="px-0 py-0">
                        <TableData
                            title="List product"
                            data={data}
                            columns={columns}
                            onSuccess={onSuccess}
                            deleteLink='http://127.0.0.1:5000/api/products/delete_more/'/>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default ListProducts;