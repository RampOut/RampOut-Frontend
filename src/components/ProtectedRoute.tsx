import { Outlet,Navigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";

interface Props {};

const ProtectedRoute = () => {
    const auth = useAuth();
    return auth.isAuthenticated ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoute;