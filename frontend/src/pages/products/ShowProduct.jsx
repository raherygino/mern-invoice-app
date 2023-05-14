import { useParams } from "react-router-dom";
import BreadCrumb from "../../components/layout/BreadCrumb"
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

const ShowProduct = () => {
    const { id } = useParams();

    return(
        <>
            <BreadCrumb title={ id }  parent="Products" linkParent="/products"></BreadCrumb>
            
            <Container className="mt-6">
                <Card>
                    <Card.Body>
                        <Card.Title className='mb-5'>New product</Card.Title>
                    </Card.Body>
                </Card>
            </Container>
        
        </>
    )
}

export default ShowProduct