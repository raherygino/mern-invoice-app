import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import { Link } from 'react-router-dom'
import Input from '../../components/form/Input'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Select from '../../components/form/Select'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react'
import NewSubCategoryModal from './modals/NewSubCategoryModal'
import NewCategoryModal from './modals/NewCategoryModal'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../features/categories/categorySlice'
import ListCategoryModal from './modals/ListCategoryModal'
import { toast } from 'react-toastify'
import { getSubCategories } from '../../features/sub-categories/subCategorySlice'
import ListSubCategoryModal from './modals/ListSubCategoryModal'
import Svg from '../../components/icons/Svg'

const NewProduct = ({organization}) => {

    
    const dispatch = useDispatch()
    const { categories } = useSelector(
      (state) => state.categories
    )

    const { subCategories, isCreated, message, isLoadingCreating, isErrorCreated } = useSelector(
        (state) =>  state.subCategories
    )

    const [modal, setModal] = useState({
        categorySelected: undefined,
        category: false,
        listCategory: false,
        subCategory: false,
        listSubCategory: false,
        error: '',
    })

    const categoryMenu = [
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

    const onEdit = (index) => {
        setModal({
            categorySelected: categories[index],
            listCategory: false,
            category: true,
        })
    }
    
    const onSuccess = () => {
        dispatch(getCategories())
        toast.success("Category deleted!")
    }

    const onHideCategory = () => {
        setModal({category: false})

        if (modal.categorySelected !== undefined) {
            setModal({listCategory: true})
        } 
    }

    dispatch(getCategories())
    dispatch(getSubCategories())

    return(
        <div className="subheader py-4 pt-lg-0 pb-lg-10">
            <Container className="d-flex align-items-center justify-content-between flex-wrap">
                <div className="d-flex flex-column mr-5">
                    <h4 className="text-primary font-weight-bold py-1 mr-5 my-0">New product </h4>
                    <ul className="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 m-0 font-size-sm">
                        <li className="breadcrumb-item">
                            <Link to="/" className="text-muted">Home </Link>
                        </li>
                        <li className="breadcrumb-item">
                            <span className=" active">New product</span>
						</li>
					</ul>
				</div>

            { categories.message ?  <p className='badge bg-danger'> { categories.message } </p>: null}
            
                <div className="d-flex align-items-center flex-wrap py-2">
                    <Dropdown className="d-inline mx-2">
                        <Dropdown.Toggle className='btn-shadow font-weight-bold ' id="dropdown-autoclose-true">
                            Manage category product
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            { categoryMenu.map((item) => (
                                <Dropdown.Item href="#" onClick={() => setModal(item.modal)}>
                                    <Svg name={item.icon} variant={item.variant}/>
                                    <span className="navi-text ms-2 mt-0-5">{item.title}</span>
                                </Dropdown.Item> )) 
                            }
                        </Dropdown.Menu>
                    </Dropdown>

                    <NewCategoryModal
                        show={modal.category}
                        organization={organization}
                        category={modal.categorySelected}
                        onHide={() => onHideCategory()} /> 

                    <ListCategoryModal 
                        show={modal.listCategory}
                        organization={organization}
                        categories={categories}
                        onSuccess={onSuccess}
                        onEdit={onEdit}
                        onHide={() => setModal({listCategory: false})} />

                    <NewSubCategoryModal 
                        show={modal.subCategory}
                        categories={categories}
                        organization={organization}
                        message={message}
                        isSuccess={isCreated}
                        isLoading={isLoadingCreating}
                        isError={isErrorCreated}
                        onHide={() => setModal({subCategory: false})}/>
                        
                    <ListSubCategoryModal 
                        show={modal.listSubCategory}
                        organization={organization}
                        subCategories={subCategories}
                        categories={categories}
                        onSuccess={onSuccess}
                        onEdit={onEdit}
                        onHide={() => setModal({listCategory: false})} />
                </div>
            </Container>

            <Container className="mt-6">
                <Card>
                    <Card.Body>
                        <Card.Title className='mb-5'>New product</Card.Title>
                        <Row>
                            <Col lg={3} md={6}>
                                <Input
                                    id="name"
                                    type="text"
                                    label="Product name" />
                            </Col>
                            <Col lg={3} md={6}>
                                <Select
                                    id="category"
                                    label="Category">
                                        { categories.organization === undefined && categories.message === undefined ? categories.map((category) => (
                                            <option key={category._id}>{ category.name }</option>
                                        )) : <option>None</option> }
                                </Select>
                            </Col>
                            <Col lg={3} md={6}>
                                <Select
                                    id="sub_category"
                                    label="Sub category">
                                    <option>Select</option>
                                    { subCategories.message === undefined ? subCategories.map((subCategory) => (
                                        <option key={subCategory._id}> { subCategory.name } </option>
                                    )): null }
                                </Select>
                            </Col>
                            <Col lg={3} md={6}>
                                <Input
                                    id="price"
                                    type="number"
                                    label="Price"/>
                            </Col>
                        </Row>
                        
                        <ReactQuill theme="snow" />

                        <Button 
                            variant="primary"
                            className='mt-2'>
                                Add
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    )
}

export default NewProduct