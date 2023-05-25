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
                                <td rowSpan={5} width={140} className="px-0 py-0">
                                    { !product.image ?  
                                    <>
                                    <span class="svg-icon svg-icon-primary svg-icon-10x">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <rect x="0" y="0" width="24" height="24"/>
                                                <path d="M3.5,21 L20.5,21 C21.3284271,21 22,20.3284271 22,19.5 L22,8.5 C22,7.67157288 21.3284271,7 20.5,7 L10,7 L7.43933983,4.43933983 C7.15803526,4.15803526 6.77650439,4 6.37867966,4 L3.5,4 C2.67157288,4 2,4.67157288 2,5.5 L2,19.5 C2,20.3284271 2.67157288,21 3.5,21 Z" fill="#000000" opacity="0.3"/>
                                                <polygon fill="#000000" opacity="0.3" points="4 19 10 11 16 19"/>
                                                <polygon fill="#000000" points="11 19 15 14 19 19"/>
                                                <path d="M18,12 C18.8284271,12 19.5,11.3284271 19.5,10.5 C19.5,9.67157288 18.8284271,9 18,9 C17.1715729,9 16.5,9.67157288 16.5,10.5 C16.5,11.3284271 17.1715729,12 18,12 Z" fill="#000000" opacity="0.3"/>
                                            </g>
                                        </svg>
                                    </span>
                                    <p className="text-center mt-0 px-0 py-0">No image</p>
                                    </>
                                     :     
                                    <a href={`http://127.0.0.1:5000/api/images/${product.image}`} target="_blank" rel="noreferrer">
                                        <img 
                                            src={`http://127.0.0.1:5000/api/images/${product.image}`} 
                                            alt={product.name}
                                            width={140}/>
                                    </a> 
                                    }
                                </td>
                            </tr>
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
                                <td colSpan={3}>
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