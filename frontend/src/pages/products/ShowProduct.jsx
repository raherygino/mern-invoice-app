import { Link, useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../components/layout/BreadCrumb"
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct, reset } from "../../features/products/productSlice"
import { useEffect } from "react";
import Spinner from "../../components/Spinner"
import ConfirmDialog from "../../components/form/ConfirmDialog";
import { toast } from "react-toastify";

const ShowProduct = () => {
    const { id } = useParams();

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { product, show } = useSelector(
        (state) => state.products
    )

    useEffect(() => {
        dispatch(getProduct(id))

        return () => {
            dispatch(reset())
        }
    }, [dispatch, id])
    
    if (show.isLoading) {
        return <Spinner />
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
           navigate('/products')
       }

    return(
        <>
            <BreadCrumb title={ product.name }  parent="Products" linkParent="/products">
                <Link to='/products' className="btn btn-light-success">List products</Link>   
                <Link to={`/products/edit/${id}`} className="btn btn-light-primary ms-2">Edit</Link>
                <Button variant="light-danger" onClick={() => onDelete(id)} className="ms-2">Delete</Button>
            </BreadCrumb>
            
            <Container className="mt-6">
                <Card>
                    <Card.Header>
                        Technical details
                    </Card.Header>
                    <Card.Body>
                        <Table bordered>
                            <tr>
                                <td>Name</td>
                                <td>{ product.name }</td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td>{ product.price }</td>
                            </tr>
                            <tr>
                                <td>Category</td>
                                <td>{ product.category }</td>
                            </tr>
                            <tr>
                                <td>Sub category</td>
                                <td>{ product.sub_category }</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <b>Desciption</b>
                                    <div dangerouslySetInnerHTML={{__html: product.description}}></div> 
                                </td>
                            </tr>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        
        </>
    )
}

export default ShowProduct