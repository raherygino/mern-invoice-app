import Row from "react-bootstrap/Row"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import logo from '../../logo.svg'
import { Outlet } from "react-router-dom"

const LayoutAuth = () => {

    return (
        <Container className="mt-lg-10 pt-lg-10">
            <p className="text-center">
                <img 
                    src={logo} 
                    alt="Logo React" 
                    width={200} />
            </p>

            <Row>
                <Col lg={3}></Col>
                <Col lg={6}>
                    <Card>
                        <Card.Body>
                            <Outlet />
                        </Card.Body>    
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default LayoutAuth