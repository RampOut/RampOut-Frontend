import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import Game from "../pages/Game";
import Login from "../pages/Login";
import Login_Profesor from "../pages/LoginProfesor";
import RegistroProfesor from "../pages/RegistroProfesor";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />
    },
    {
        path: "/game",
        element: <Game />,
        errorElement: <ErrorPage />
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />
    },
    {
        path: "/login/profesor",
        element: <Login_Profesor />,
        errorElement: <ErrorPage />
    },
    {
        path: "/registro",
        element: <RegistroProfesor />,
        errorElement: <ErrorPage />
    },
]);

export default router;
