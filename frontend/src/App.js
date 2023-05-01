import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/style.css'
import Login from './pages/Login';
import LayoutAuth from './components/layout/LayoutAuth'
import Home from './pages/Home'
import Register from './pages/Register'
import Forgot from './pages/Forgot'
import LayoutMaster from './components/layout/LayoutMaster'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, reset } from './features/users/userSlice'

function App() {
  
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { users, isError, message } = useSelector(
    (state) => state.users
  )

  useEffect(() => {

    dispatch(getUsers())

    return () => {
      dispatch(reset())
    }
  }, [user, isError, message, dispatch])

  return (
    <>
      <Router>
        <Routes>
          <Route element={<LayoutAuth/>}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forgot' element={<Forgot />} />
          </Route>
          <Route element={<LayoutMaster/>}>
            <Route path='/' element={<Home user={users} />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
