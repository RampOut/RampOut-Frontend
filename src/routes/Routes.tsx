import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ErrorPage from "../pages/ErrorPage";
import Game from "../pages/Game";
import Login from "../pages/Login";

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
]);

export default router;
