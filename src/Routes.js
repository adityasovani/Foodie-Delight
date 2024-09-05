import { createBrowserRouter } from "react-router-dom";
import Login from './Screens/Login/Login';
import App from "./App";
import Dashboard from "./Screens/Dashboard/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
]);

export default router;