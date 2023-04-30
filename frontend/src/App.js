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

function App() {
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
            <Route path='/' element={<Home />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
