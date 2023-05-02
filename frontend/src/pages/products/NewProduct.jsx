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

const NewProduct = () => {
    
    return(
        <div className="subheader py-4 pt-lg-0 pb-lg-10">
            <Container className="d-flex align-items-center justify-content-between flex-wrap">
                <div class="d-flex flex-column mr-5">
                    <h4 class="text-dark font-weight-bold py-1 mr-5 my-0">New product 
						<small class="text-muted"> Add your own product</small>
                    </h4>
                    <ul class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 m-0 font-size-sm">
                        <li class="breadcrumb-item">
                            <Link to="/" class="text-muted">Home </Link>
                        </li>
                        <li class="breadcrumb-item">
                            <span class=" active">New product</span>
						</li>
					</ul>
				</div>
                <Link className='btn btn-secondary' to="/products" >Liste product</Link>
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
                                    data={['Smartphone', 'Casque', 'Accessoires']}
                                    label="Category" />
                            </Col>
                            <Col lg={3} md={6}>
                                <Select
                                    id="sous_category"
                                    data={['iphone', 'samsung', 'sony']}
                                    label="Category" />
                            </Col>
                            <Col lg={3} md={6}>
                                <Input
                                    id="price"
                                    type="number"
                                    label="Price" />
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