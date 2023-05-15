import BreadCrumb from "../../components/layout/BreadCrumb"
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from "react-redux"
import { getProducts, reset } from "../../features/products/productSlice"
import { Link, useNavigate } from "react-router-dom"
import Spinner from "../../components/Spinner"
import { useCallback, useEffect, useMemo, useState } from "react"
import ConfirmDialog from "../../components/form/ConfirmDialog"
import { toast } from 'react-toastify'
import DataTable from 'react-data-table-component'

const ListProducts = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { products, get } = useSelector(
        (state) => state.products
    )

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            grow: 2,
        },
        {
            name: 'Category',
            selector: row => row.category,
            sortable: true,
        },
        {
            name: 'Sub category',
            selector: row => row.sub_category,
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true,
            right: true,
        },
        {
            
            name: 'Actions',
            cell: () => <Button variant="outline-primary" size="sm">Show </Button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        
    ]

    const data = []

    const [selectedRows, setSelectedRows] = useState([]);
	const [toggleCleared, setToggleCleared] = useState(false)

	const handleRowSelected = useCallback(state => {
		setSelectedRows(state.selectedRows);
	}, []);

	const contextActions = useMemo(() => {
		const handleDelete = () => {
            const query = `${selectedRows.map(
                (product, i) => `id_${i+1}=${product._id}`
            )}`.replace(',', '&')
        
            ConfirmDialog({
                title: "Are you sure you want to delete",
                text: `${selectedRows.map(r => r.name)}?`,
                link:`http://127.0.0.1:5000/api/products/delete_more/?${query}`,
                onSuccess: () => {
				    setToggleCleared(!toggleCleared)
                    toast.success("Product deleted!")
                    
                    dispatch(getProducts())
                }
            })
		}

        const handleEdit = () => {
            navigate(`/products/edit/${selectedRows[0]._id}`)
        }

		return (
            <>
                { selectedRows.length === 1 ? 
                    <Button key="edit" onClick={handleEdit} variant="success" className="btn-shadow me-2">
                        Edit
                    </Button> : null
                }
			    <Button key="delete" onClick={handleDelete} variant="danger" className="btn-shadow">
				    Delete
			    </Button>
            </>
		);
	}, [selectedRows, toggleCleared, dispatch, navigate]);

    for (let i = 0; i < products.length ; i++) {
        data.push(products[i])
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
            <BreadCrumb title="Products">
                <Link className="btn btn-light-primary" to="/new_product">Add new product</Link>
            </BreadCrumb>
            
            <Container className="mt-6">
                <Card>
                    <Card.Body className="px-0 py-0">
                        <DataTable
                            title="List products"
                            columns={columns}
                            data={data}
                            pagination
                            selectableRows
                            highlightOnHover
                            contextActions={contextActions}
                            onSelectedRowsChange={handleRowSelected}
                            clearSelectedRows={toggleCleared} />
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default ListProducts;