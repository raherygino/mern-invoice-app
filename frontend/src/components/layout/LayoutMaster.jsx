import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'
import { useEffect } from 'react'

const LayoutMaster = ({organization, userAuth}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])


    const onLogout = () => {
      dispatch(logout())
      dispatch(reset())
    }

    return(
        <>
            <Navbar bg="dark" variant='dark' expand="lg">
                <Container fluid>
                    <Link className="navbar-brand" to="/">
                        { organization.name }
                    </Link>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll >

                            <NavLink to="/" className="nav-link me-2"> 
                                <span className='menu-text'>Home</span>
                            </NavLink>

                            <NavLink to="/new-product" className="nav-link me-2">
                                <span className='menu-text'>New product</span>
                            </NavLink>

                            <NavLink to="/products" className="nav-link me-2">
                                <span className='menu-text'>All products</span>
                            </NavLink>

                            <NavLink to="/new-invoice" className="nav-link me-2">
                                <span className='menu-text'>New invoice</span>
                            </NavLink>

                            <NavLink to="/invoices" className="nav-link me-2">
                                <span className='menu-text'>All invoices</span>
                            </NavLink>

                        </Nav>
                    
                        <Nav>
                            <NavDropdown title={ `${userAuth.lastname} ${userAuth.firstname}` } id="basic-nav-dropdown">
                                <NavDropdown.Item href="#">Profile</NavDropdown.Item>
                                <NavDropdown.Item href="#">Settings</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className='mt-3'>
                <Outlet />
            </Container>
        </>
    )
}

export default LayoutMaster