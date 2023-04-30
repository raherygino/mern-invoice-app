import Input from "../components/form/Input"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register, reset } from '../features/auth/authSlice'
import Spinner from "../components/Spinner"
import organizationService from "../features/organization/organizationService"

const Register = () => {

    const [formData, setFormData] = useState({
        organization: '',
        lastname: '',
        firstname: '',
        birth_date: '',
        birth_place: '',
        phone: '',
        email: '',
        password: '',
        name: ''
    })
  
    const { organization, lastname, firstname, birth_date, birth_place, phone, email, password, name } = formData
  
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const { user, isError, isLoading, isSuccess, message } = useSelector(
      (state) => state.auth
    )
  
    useEffect(() => {
      if (isError) {
        toast.error(message)
      }
  
      if (isSuccess || user) {
        navigate('/')
      }
  
      dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])
  
    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }))
    }
  
    const onSubmit = (e) => {
        e.preventDefault()

        organizationService.createOrganization({name,})
            .then((res) => {
                const organization = res._id
                formData.organization = organization
        
                const userData = {
                    organization,
                    lastname,
                    firstname,
                    birth_date,
                    birth_place,
                    phone,
                    email,
                    password,
                }

                console.log(userData)
                dispatch(register(userData))

            })
            .catch((error) => {
                console.log(error)
            })
    }

    if (isLoading) {
      return <Spinner />
    }

    return(
        <>
            <Card.Title className="mb-2">Register</Card.Title>
            <Card.Text>Already have an Account? 
                <Link to="../login"> Sign in</Link>
            </Card.Text>
            
            <form onSubmit={onSubmit}>
                
                <Row>
                    <Col md={6} lg={6}>
                        <Input
                            id="lastname"
                            type="text"
                            label="Your lastname"
                            value={lastname}
                            onChange={onChange} />
                    </Col>
                    <Col md={6} lg={6}>
                        <Input
                            id="firstname"
                            type="text"
                            label="Your firstname"
                            value={firstname}
                            onChange={onChange} />
                    </Col>
                </Row>
                
                <Row>
                    <Col md={6} lg={6}>
                        <Input
                            id="birth_date"
                            type="date"
                            label="Your birth date"
                            value={birth_date}
                            onChange={onChange} />
                    </Col>
                    <Col md={6} lg={6}>
                        <Input
                            id="birth_place"
                            type="text"
                            label="Your birth place"
                            value={birth_place}
                            onChange={onChange} />
                    </Col>
                </Row>

                <Input
                    id="name"
                    type="text"
                    label="Organization" 
                    value={name}
                    onChange={onChange} />
                
                <Input
                    id="phone"
                    type="text"
                    label="Your phone"
                    value={phone}
                    onChange={onChange} />

                <Input
                    id="email"
                    type="email"
                    label="Your email"
                    value={email}
                    onChange={onChange} />
                
                <Input
                    id="password"
                    type="password"
                    label="Your password"
                    value={password}
                    onChange={onChange} />
                
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