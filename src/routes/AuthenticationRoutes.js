import LayoutAuth from "../components/layout/LayoutAuth";
import Forgot from "../pages/auth/Forgot";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

const AuthenticationRoutes = {
    path: '/',
    element: <LayoutAuth />,
    children: [
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/register',
            element: <Register />
        },
        {
            path: '/forgot',
            element: <Forgot />
        }
    ]
}

export default AuthenticationRoutes