import { useEffect, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { errorToast } from "../helper/helperToast";
import { ErrorComponent } from "./helperComponents";
import StdNavbar from "./navbar";
import AdminSidebar from "./adminSidebar";
import { GetToken } from "../helper/getAuth";
import { SidebartoggelContext } from "../context/context";

const isTokenExpired = (token: string): boolean => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);

        return payload.exp < currentTime;
    } catch (e) {
        return true; // consider invalid token as expired
    }
};

const PrivateRoute = ({ children, allowedRole }: { children: JSX.Element; allowedRole: "admin" | "student"; }) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const [role, setRole] = useState<string | null>('');
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const role = localStorage.getItem("role");
        setRole(role)
        const token = GetToken()
        if (!token) {
            errorToast("You Are Not Logged In.Please Log In First", 'not-login')
            navigate("/login");
            return
        }

        if (isTokenExpired(token)) {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            errorToast("JWT expired. Please log in again.", "JWT-expired");
            navigate('/login')
            return
        }

        if (role !== allowedRole) {
            errorToast('Forbidden: You Do Not Have The Required Permission.', 'forbidden')
            setIsAuthorized(false);
            return
        }
        setIsAuthorized(true);
    }, [allowedRole, navigate]);


    useEffect(() => {
        if (isAuthorized === false || null) {
            const t = setTimeout(() => navigate("/"), 2000);
            return () => clearTimeout(t);
        }
    }, [isAuthorized, navigate]);

    if (isAuthorized === false || null) {
        return <ErrorComponent error="Forbidden: You Do Not Have The Required Permission" />;
    }



    if (role === "admin") {
        return (

            <div className="d-flex">
                <SidebartoggelContext.Provider value={{ collapsed, setCollapsed }}>
                    <AdminSidebar />
                    <div className="px-md-5 px-3"
                        style={{
                            flex: 1, marginLeft: collapsed ? "55px" : "250px",
                            transition: "margin 0.3s ease-in-out",
                        }}>
                        {children}
                    </div>
                </SidebartoggelContext.Provider>
            </div>
        );
    }

    if (role === "student") {
        return (
            <>
                <StdNavbar />
                {children}
            </>
        );
    }

};

export default PrivateRoute
