import BreadCrumb from "../../components/layout/BreadCrumb"
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'

const ListProducts = () => {



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
                                    <th>Category</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>
                                        
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default ListProducts;