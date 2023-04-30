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

function App() {
  return (
    <>
      <Router >
        <div className='container'>
          <Routes>
            <Route element={<LayoutAuth/>}>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/forgot' element={<Forgot />} />
            </Route>
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
