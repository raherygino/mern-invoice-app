import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import { useNavigate, useOutletContext } from 'react-router-dom'
import Input from '../../components/form/Input'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Select from '../../components/form/Select'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import NewSubCategoryModal from './modals/NewSubCategoryModal'
import NewCategoryModal from './modals/NewCategoryModal'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../features/categories/categorySlice'
import ListCategoryModal from './modals/ListCategoryModal'
import { toast } from 'react-toastify'
import { getSubCategories, getSubCategoriesByCategory } from '../../features/sub-categories/subCategorySlice'
import ListSubCategoryModal from './modals/ListSubCategoryModal'
import Svg from '../../components/icons/Svg'
import Menu from '../../menu'
import { createProduct, reset } from '../../features/products/productSlice'
import BreadCrumb from '../../components/layout/BreadCrumb'

const NewProduct = () => {  

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [user, userAuth] = useOutletContext()

    const { categories, stateCreate } = useSelector(
      (state) => state.categories
    )
    
    const { subCategories, subCategoryCreate, subCategoriesByCategory } = useSelector(
        (state) =>  state.subCategories
    )

    const { products, createOrUpdate, product } = useSelector(
        (state) => state.products
    )

    const [config, setConfig] = useState({
        categorySelected: undefined,
        subCategorySelected: undefined,
        category: false,
        listCategory: false,
        subCategory: false,
        listSubCategory: false,
        error: '',
    })

    const [dataProduct, setDataProduct] = useState({
        name: '',
        category: '',
        sub_category: '',
        price: 0,
        description: '',
        organization: userAuth.organization,
        user: userAuth._id,
    })

    useEffect(() => {
        if (stateCreate.isSuccess) {
            setConfig({category: false})
            setConfig({listCategory: true})
        }

        if (subCategoryCreate.isSuccess) {
            setConfig({subCategory: false})
            setConfig({listSubCategory: true})
        }
        
        if (createOrUpdate.isSuccess) {
            toast.success(createOrUpdate.message)
            navigate(`/products/show/${product._id}`)
        }

        if (createOrUpdate.isError) {
            toast.error(createOrUpdate.message)
        }
        
        return () => {
            dispatch(reset())
        }

    }, [setConfig, stateCreate, subCategoryCreate, products, createOrUpdate, dispatch, navigate, product])

    const onEdit = (index) => {
        setConfig({
            categorySelected: categories[index],
            listCategory: false,
            category: true,
        })
    }

    const onEditSubCategory = (index) => {
        setConfig({
            subCategorySelected: subCategories[index],
            listSubCategory: false,
            subCategory: true,
        })
    }

    const onChange = (e) => {

        if (e.target !== undefined && e.target.name === 'category') {
            dispatch(getSubCategoriesByCategory(e.target.value))
        }
        if (e.target === undefined) {
            setDataProduct((prevState) => ({
                ...prevState,
                description : e }
            ))
        } else {
            setDataProduct((prevState) => ({
                ...prevState,
                [e.target.name] : e.target.value }
            ))
        }
    }
    
    const onSuccess = () => {
        dispatch(getCategories())
        toast.success("Category deleted!")
    }

    const onHideCategory = () => {
        setConfig({category: false})

        if (config.categorySelected !== undefined) {
            setConfig({listCategory: true})
        } 
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createProduct(dataProduct))
    }

    dispatch(getCategories())
    dispatch(getSubCategories())

    if (user === undefined) {
        return(<>Error</>)
    }

    return(
        <>
            <BreadCrumb title="New product" parent="Products" linkParent="/products">
                <Dropdown className="d-inline mx-2"> 
                        <Dropdown.Toggle className='btn-light-primary font-weight-bold ' id="dropdown-autoclose-true">
                            <span className="svg-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
							        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
										<rect x="0" y="0" width="24" height="24"></rect>
										<path d="M18.6225,9.75 L18.75,9.75 C19.9926407,9.75 21,10.7573593 21,12 C21,13.2426407 19.9926407,14.25 18.75,14.25 L18.6854912,14.249994 C18.4911876,14.250769 18.3158978,14.366855 18.2393549,14.5454486 C18.1556809,14.7351461 18.1942911,14.948087 18.3278301,15.0846699 L18.372535,15.129375 C18.7950334,15.5514036 19.03243,16.1240792 19.03243,16.72125 C19.03243,17.3184208 18.7950334,17.8910964 18.373125,18.312535 C17.9510964,18.7350334 17.3784208,18.97243 16.78125,18.97243 C16.1840792,18.97243 15.6114036,18.7350334 15.1896699,18.3128301 L15.1505513,18.2736469 C15.008087,18.1342911 14.7951461,18.0956809 14.6054486,18.1793549 C14.426855,18.2558978 14.310769,18.4311876 14.31,18.6225 L14.31,18.75 C14.31,19.9926407 13.3026407,21 12.06,21 C10.8173593,21 9.81,19.9926407 9.81,18.75 C9.80552409,18.4999185 9.67898539,18.3229986 9.44717599,18.2361469 C9.26485393,18.1556809 9.05191298,18.1942911 8.91533009,18.3278301 L8.870625,18.372535 C8.44859642,18.7950334 7.87592081,19.03243 7.27875,19.03243 C6.68157919,19.03243 6.10890358,18.7950334 5.68746499,18.373125 C5.26496665,17.9510964 5.02757002,17.3784208 5.02757002,16.78125 C5.02757002,16.1840792 5.26496665,15.6114036 5.68716991,15.1896699 L5.72635306,15.1505513 C5.86570889,15.008087 5.90431906,14.7951461 5.82064513,14.6054486 C5.74410223,14.426855 5.56881236,14.310769 5.3775,14.31 L5.25,14.31 C4.00735931,14.31 3,13.3026407 3,12.06 C3,10.8173593 4.00735931,9.81 5.25,9.81 C5.50008154,9.80552409 5.67700139,9.67898539 5.76385306,9.44717599 C5.84431906,9.26485393 5.80570889,9.05191298 5.67216991,8.91533009 L5.62746499,8.870625 C5.20496665,8.44859642 4.96757002,7.87592081 4.96757002,7.27875 C4.96757002,6.68157919 5.20496665,6.10890358 5.626875,5.68746499 C6.04890358,5.26496665 6.62157919,5.02757002 7.21875,5.02757002 C7.81592081,5.02757002 8.38859642,5.26496665 8.81033009,5.68716991 L8.84944872,5.72635306 C8.99191298,5.86570889 9.20485393,5.90431906 9.38717599,5.82385306 L9.49484664,5.80114977 C9.65041313,5.71688974 9.7492905,5.55401473 9.75,5.3775 L9.75,5.25 C9.75,4.00735931 10.7573593,3 12,3 C13.2426407,3 14.25,4.00735931 14.25,5.25 L14.249994,5.31450877 C14.250769,5.50881236 14.366855,5.68410223 14.552824,5.76385306 C14.7351461,5.84431906 14.948087,5.80570889 15.0846699,5.67216991 L15.129375,5.62746499 C15.5514036,5.20496665 16.1240792,4.96757002 16.72125,4.96757002 C17.3184208,4.96757002 17.8910964,5.20496665 18.312535,5.626875 C18.7350334,6.04890358 18.97243,6.62157919 18.97243,7.21875 C18.97243,7.81592081 18.7350334,8.38859642 18.3128301,8.81033009 L18.2736469,8.84944872 C18.1342911,8.99191298 18.0956809,9.20485393 18.1761469,9.38717599 L18.1988502,9.49484664 C18.2831103,9.65041313 18.4459853,9.7492905 18.6225,9.75 Z" fill="#000000" fillRule="nonzero" opacity="0.3"></path>
										<path d="M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000"></path>
									</g>
							    </svg>
                            </span>
                            Manage category product
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            { Menu.category.map((item) => (
                                <Dropdown.Item href="#" key={item.title} onClick={() => setConfig(item.modal)}>
                                    <Svg name={item.icon} variant={item.variant}/>
                                    <span className="navi-text ms-2 mt-0-5">{item.title}</span>
                                </Dropdown.Item> )) 
                            }
                        </Dropdown.Menu>
                    </Dropdown>

                    <NewCategoryModal
                        show={config.category}
                        organization={user.organization}
                        category={config.categorySelected}
                        state={stateCreate}
                        onHide={() => onHideCategory()} /> 

                    <ListCategoryModal 
                        show={config.listCategory}
                        organization={user.organization}
                        categories={categories}
                        onSuccess={onSuccess}
                        onEdit={onEdit}
                        onHide={() => setConfig({listCategory: false})} />

                    <NewSubCategoryModal 
                        show={config.subCategory}
                        categories={categories}
                        subCategory={config.subCategorySelected}
                        organization={user.organization}
                        message={subCategoryCreate.message}
                        isSuccess={subCategoryCreate.isSuccess}
                        isLoading={subCategoryCreate.isLoading}
                        isError={subCategoryCreate.isError}
                        onHide={() => setConfig({subCategory: false})}/>
                        
                    <ListSubCategoryModal 
                        show={config.listSubCategory}
                        organization={user.organization}
                        subCategories={subCategories}
                        categories={categories}
                        onSuccess={onSuccess}
                        onEdit={onEditSubCategory}
                        onHide={() => setConfig({listCategory: false})} />
            </BreadCrumb>

            <Container className="mt-6">
                <Card>
                    <Card.Body>
                        <Card.Title className='mb-5'>New product</Card.Title>
                        <form onSubmit={onSubmit}>
                            <Row>
                                <Col md={2} lg={2}>
                                    <label htmlFor='img-prod' className='btn-text-primary btn-hover-light-primary ps-3 pe-2 cursor-pointer'>
                                        <span class="svg-icon svg-icon-10x">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                    <polygon points="0 0 24 0 24 24 0 24"/>
                                                    <path d="M5.85714286,2 L13.7364114,2 C14.0910962,2 14.4343066,2.12568431 14.7051108,2.35473959 L19.4686994,6.3839416 C19.8056532,6.66894833 20,7.08787823 20,7.52920201 L20,20.0833333 C20,21.8738751 19.9795521,22 18.1428571,22 L5.85714286,22 C4.02044787,22 4,21.8738751 4,20.0833333 L4,3.91666667 C4,2.12612489 4.02044787,2 5.85714286,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"/>
                                                    <path d="M11,14 L9,14 C8.44771525,14 8,13.5522847 8,13 C8,12.4477153 8.44771525,12 9,12 L11,12 L11,10 C11,9.44771525 11.4477153,9 12,9 C12.5522847,9 13,9.44771525 13,10 L13,12 L15,12 C15.5522847,12 16,12.4477153 16,13 C16,13.5522847 15.5522847,14 15,14 L13,14 L13,16 C13,16.5522847 12.5522847,17 12,17 C11.4477153,17 11,16.5522847 11,16 L11,14 Z" fill="#000000"/>
                                                </g>
                                            </svg>
                                        </span>
                                        <input type="file" hidden id='img-prod' />
                                    </label>
                                </Col>
                                <Col md={10} lg={10}>
                                    <Row>
                                        <Col lg={3} md={6}>
                                            <Input
                                                id="name"
                                                type="text"
                                                label="Product name"
                                                onChange={onChange} />
                                        </Col>
                                        <Col lg={3} md={6}>
                                            <Select
                                                id="category"
                                                label="Category"
                                                onChange={onChange}>
                                                <option value="">Select</option>
                                                    { categories.organization === undefined && categories.message === undefined ? categories.map((category) => (
                                                    <option key={category._id} value={category._id} >{ category.name }</option>
                                                    )) : <option>None</option> }
                                            </Select>
                                        </Col>
                                        <Col lg={3} md={6}>
                                        <Select
                                            id="sub_category"
                                            label="Sub category"
                                            onChange={onChange}>
                                            <option value="">Select</option>
                                            { subCategoriesByCategory.message === undefined ? subCategoriesByCategory.map((subCategory) => (
                                                <option key={subCategory._id} value={subCategory._id}> { subCategory.name } </option>
                                            )): null }
                                        </Select>
                                    </Col>
                                    <Col lg={3} md={6}>
                                        <Input
                                            id="price"
                                            type="number"
                                            label="Price"
                                            onChange={onChange}/>
                                        </Col>
                                    </Row>
                                    <ReactQuill theme="snow" name="description" onChange={onChange} />

                                    <Button 
                                        variant="primary btn-shadow"
                                        type='submit'
                                        className='mt-2'>
                                        <span class="svg-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                    <rect fill="#000000" x="4" y="11" width="16" height="2" rx="1"/>
                                                    <rect fill="#000000" opacity="0.3" transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) " x="4" y="11" width="16" height="2" rx="1"/>
                                                </g>
                                            </svg>
                                        </span>  Add
                                    </Button>
                                </Col>
                            </Row>
                        </form>
                    </Card.Body>
                </Card>
            </Container>
            </>
    )
}

export default NewProduct