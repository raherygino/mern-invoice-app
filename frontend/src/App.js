import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/style.css'
import './assets/css/main.css'
import ThemeRoutes from './routes'
function App() {

  return (
    <>
      <Router>
          <ThemeRoutes />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
 