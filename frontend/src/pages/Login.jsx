import Input from "../components/form/Input"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"

const Login = () => {

    return(
        <>
            <Card.Title className="mb-2">Login</Card.Title>
            <Card.Text>New here? 
                <Link to="../register"> Create Account</Link>
            </Card.Text>
            
            <form>
                <Input
                    id="email"
                    type="email"
                    label="Your email" />
                
                <Input
                    id="password"
                    type="password"
                    label="Your password" />
                    
                <p className="text-right">
                    <Link to="../forgot" >Forgot password ?</Link>
                </p>
                
                <Button 
                    type="submit"
                    variant="primary"
                    className="btn-block btn-lg"> Sign up
                </Button>
            </form>
        </>
    )
}

export default Login;