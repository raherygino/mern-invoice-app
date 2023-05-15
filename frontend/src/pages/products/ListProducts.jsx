import BreadCrumb from "../../components/layout/BreadCrumb"
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import { useDispatch, useSelector } from "react-redux"
import { getProducts, reset } from "../../features/products/productSlice"
import ButtonActions from "../../components/form/ButtonActions"
import { Link, useNavigate } from "react-router-dom"
import Spinner from "../../components/Spinner"
import { useEffect } from "react"
import ConfirmDialog from "../../components/form/ConfirmDialog"
import { toast } from 'react-toastify'

const ListProducts = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { products, get } = useSelector(
        (state) => state.products
    )

    const onEdit = (index) => {
        navigate(`/products/edit/${products[index]._id}`)
    }

    const onDelete = (id) => {
     //   console.log(id)
        ConfirmDialog({
            title: "Are you sure?",
            text: "You want to delete",
            link:`http://127.0.0.1:5000/api/products/delete/${id}`,
            onSuccess: onSuccess
        })
    }

    const onSuccess = () => {
        toast.success("Product deleted!")
        dispatch(getProducts())
    }

    useEffect(() => {
        dispatch(getProducts())

        return () => {
            dispatch(reset())
        }
    }, [dispatch])
    
    if (get.isLoading) {
        return <Spinner />
    }

    return(
        <>
            <BreadCrumb title="Products"></BreadCrumb>
            
            <Container className="mt-6">
                <Card>
                    <Card.Body>
                        <Card.Title className='mb-5'>All products</Card.Title>
                        <Table bordered hover size="md">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th className="text-right">Price</th>
                                    <th>Category</th>
                                    <th>Sub category</th>
                                    <th style={{width: '100px'}}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                { products.map((product, index) => (
                                <tr key={index}>
                                    <td><Link to={`/products/show/${product._id}`}>{ product.name }</Link></td>
                                    <td align="right">{ product.price }</td>
                                    <td>{ product.category }</td>
                                    <td>{ product.sub_category }</td>
                                    <td align="center">
                                        <ButtonActions 
                                            index={index} 
                                            item={product}
                                            onEdit={onEdit} 
                                            onDelete={onDelete} />
                                    </td>
                                </tr>
                                    
                                )) }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default ListProducts;