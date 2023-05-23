import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Dropdown from 'react-bootstrap/Dropdown'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserById, logout, reset } from '../../features/auth/authSlice'
import { useEffect } from 'react'
import Svg from '../icons/Svg'
import Menu from '../../menu'
import MainRoutes from '../../routes/MainRoutes'
import { getOrganization } from '../../features/organization/organizationSlice'

const LayoutMaster = () => {

  //  const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, userAuth } = useSelector((state) => state.auth)
    const { organization } = useSelector((state) => state.organization )

    useEffect(() => {
        if ( userAuth === null) {
            navigate('/login')
        }
    }, [userAuth, navigate])

    if (userAuth !== undefined && userAuth !== null) {
        dispatch(getUserById(userAuth._id))
        dispatch(getOrganization())
    }

    const onLogout = () => {
      dispatch(logout())
      dispatch(reset())
      navigate('/login')
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

                            { MainRoutes.children.map((route) => (
                             route.name !== "show_product" && route.name !== "edit_product" && route.name !== "not_found" ? 
                                <NavLink key={route.path} to={ route.path } className="nav-link me-2">
                                    <span className='menu-text'>{ route.name }</span>
                                </NavLink> : null)) 
                            }

                        </Nav>
                    
                        <Nav>
                            <Dropdown className="d-inline mx-2">
                                <Dropdown.Toggle id="dropdown-autoclose-true" className="btn-dark w-auto btn-user d-inline-flex align-items-center">
                                    <span className="symbol symbol-35 symbol-light-danger">
                                        <span className="symbol-label font-size-h5 font-weight-bold">
                                            { userAuth !== null ? userAuth.lastname.charAt(0) : null}
                                        </span>
                                    </span>
                                    <span className="text-dark-50 font-weight-bolder font-size-base ml-3">
                                        { userAuth !== null ? userAuth.lastname : null}
                                    </span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu className='ml-4'>
                                    { Menu.user.map((item, index) => (
                                        <Link to={item.to} key={index} data-rr-ui-dropdown-item className='dropdown-item'>
                                            <Svg name={ item.icon } variant={ item.variant } />
                                            <span className="navi-text ms-2 mt-0-5">{ item.title }</span>
                                        </Link>
                                    )) }
                                    
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={onLogout}>
                                        <Svg name="logout" variant="danger" />
                                        <span className="navi-text ms-2 mt-0-5">Logout</span>
                                    </NavDropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className='mt-3'>
                <div className="subheader py-4 pt-lg-0 pb-lg-10">
                    <Outlet context={[user, userAuth]} />
                </div>
            </Container>
        </>
    )
}

export default LayoutMaster