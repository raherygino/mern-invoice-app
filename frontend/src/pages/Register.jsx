import Input from "../components/form/Input"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

const Register = () => {
    return(
        <>
            <Card.Title className="mb-2">Register</Card.Title>
            <Card.Text>Already have an Account? 
                <Link to="../login"> Sign in</Link>
            </Card.Text>
            
            <form>
                <Row>
                    <Col md={6} lg={6}>
                        <Input
                            id="lastname"
                            type="text"
                            label="Your lastname" />
                    </Col>
                    <Col md={6} lg={6}>
                        <Input
                            id="firstname"
                            type="text"
                            label="Your firstname" />
                    </Col>
                </Row>
                
                <Row>
                    <Col md={6} lg={6}>
                        <Input
                            id="birth_date"
                            type="date"
                            label="Your birth date" />
                    </Col>
                    <Col md={6} lg={6}>
                        <Input
                            id="birth_place"
                            type="text"
                            label="Your birth place" />
                    </Col>
                </Row>

                <Input
                    id="organization"
                    type="text"
                    label="Organization" />
                
                <Input
                    id="phone"
                    type="text"
                    label="Your phone" />

                <Input
                    id="email"
                    type="email"
                    label="Your email" />
                
                <Input
                    id="password"
                    type="password"
                    label="Your password" />
                
                <Button 
                    type="submit"
                    variant="primary"
                    className="btn-block btn-lg"> Register
                </Button>
            </form>
        </>
    )
}

export default Register