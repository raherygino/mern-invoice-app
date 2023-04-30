import Input from "../components/form/Input"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"

const Forgot = () => {

    return(
        <>
            <Card.Title className="mb-2">Forgotten Password</Card.Title>
            <Card.Text>Enter your email to reset your password</Card.Text>
            
            <form>
                <Input
                    id="email"
                    type="email"
                    label="Your email" />

                <Link
                    className="btn btn-light me-2"
                    to="../login">Cancel
                </Link>
                    
                <Button 
                    type="submit"
                    variant="primary"> Send
                </Button>
            </form>
        </>
    )
}

export default Forgot