import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { ROUTES } from "./routes";

const ProtectedRoute = () => {
    const { isLoggedIn } = useAuthStore();
    return isLoggedIn ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
};

export default ProtectedRoute;