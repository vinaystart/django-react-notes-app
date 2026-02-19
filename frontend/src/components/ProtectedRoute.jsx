import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../Api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem(ACCESS_TOKEN);

            if (!token) {
                setIsAuthorized(false);
                return;
            }

            try {
                const decoded = jwtDecode(token);
                const now = Date.now() / 1000;

                if (decoded.exp < now) {
                    const refresh = localStorage.getItem(REFRESH_TOKEN);

                    const res = await api.post("/api/token/refresh/", {
                        refresh: refresh,
                    });

                    localStorage.setItem(ACCESS_TOKEN, res.data.access);
                }

                setIsAuthorized(true);
            } catch (error) {
                console.log(error);
                setIsAuthorized(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
