import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/style.css'
import './assets/css/main.css'
import Login from './pages/auth/Login';
import LayoutAuth from './components/layout/LayoutAuth'
import Home from './pages/Home'
import Register from './pages/auth/Register'
import Forgot from './pages/auth/Forgot'
import LayoutMaster from './components/layout/LayoutMaster'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, reset } from './features/users/userSlice'
import { getOrganization } from './features/organization/organizationSlice'
import Products from './pages/products/ListProducts'
import Invoices from './pages/invoices/Invoices'
import NewProduct from './pages/products/NewProduct'
import NewInvoice from './pages/invoices/NewInvoice'
import NotFound from './pages/notFound'
import ShowProducts from './pages/products/ShowProduct'
function App() {
  
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { users, isError, message } = useSelector(
    (state) => state.users
  )

  const {organization } = useSelector(
    (state) => state.organization
  )

  useEffect(() => {

    dispatch(getUsers())
    dispatch(getOrganization())

    return () => {
      dispatch(reset())
    }
  }, [ user, isError, message, dispatch])

  return (
    <>
      <Router>
        <Routes>
          <Route element={<LayoutAuth/>}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot' element={<Forgot />} />
          </Route>
          <Route element={<LayoutMaster userAuth={ users } organization={organization} />}>
            <Route path='/' element={<Home user={users} />} />
            <Route path='/new-product' element={ <NewProduct user={user} />} />
            <Route path='/products/show/:id' element={ <ShowProducts /> } />
            <Route path='/products' element={ <Products />} />
            <Route path='/new-invoice' element={ <NewInvoice />} />
            <Route path='/invoices' element={ <Invoices />} />
            <Route path='/*' element={<NotFound user={users} />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
