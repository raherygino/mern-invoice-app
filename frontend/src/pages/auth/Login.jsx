import Input from "../../components/form/Input"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../../features/auth/authSlice'
import Spinner from '../../components/Spinner'

const Login = () => {
    
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userAuth, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (userAuth) {
      navigate('/')
    }

    dispatch(reset())
  }, [userAuth, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }

    dispatch(login(userData))
  }

  if (isLoading) {
    return <Spinner />
  }


    return(
        <>
            <Card.Title className="mb-2">Login</Card.Title>
            <Card.Text>New here? 
                <Link to="../register"> Create Account</Link>
            </Card.Text>
            
            <form onSubmit={onSubmit}>
                <Input
                    id="email"
                    type="email"
                    label="Your email"
                    onChange={onChange} 
                    value={email}/>
                
                <Input
                    id="password"
                    type="password"
                    label="Your password"
                    onChange={onChange} 
                    value={password} />
                    
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