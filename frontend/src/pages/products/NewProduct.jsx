import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
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

const NewProduct = ({categories}) => {
    const [modalCategory, setModalCategory] = useState(false);
    const [showModal, setShowModal] = useState(false)
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

                <div className="d-flex align-items-center flex-wrap py-2">
                    <Link className='btn btn-bg-white btn-hover-text-primary btn-icon-primary mr-3' to="/products" >
                        Liste product
                    </Link>

                    <Button variant='danger' className='mr-3'  onClick={() => setModalCategory(true)} >New category</Button>
                    <NewCategoryModal
                        show={modalCategory}
                        onHide={() => setModalCategory(false)} /> 
                    
                    <Button variant='info' onClick={() => setShowModal(true)}>New sub category</Button>
                    <NewSubCategoryModal 
                        show={showModal}
                        categories={categories}
                        onHide={() => setShowModal(false)}/>
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
                                        { categories.map((category) => (
                                            <option key={category._id}>{ category.name }</option>
                                        )) }
                                </Select>
                            </Col>
                            <Col lg={3} md={6}>
                                <Select
                                    id="sub_category"
                                    label="Sub category">
                                    <option>Value</option>
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