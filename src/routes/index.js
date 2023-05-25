import { useRoutes } from "react-router-dom"
import AuthenticationRoutes from "./AuthenticationRoutes"
import MainRoutes from "./MainRoutes";


const ThemeRoutes = () => {
    return useRoutes([MainRoutes, AuthenticationRoutes]);
}

export default ThemeRoutes
    