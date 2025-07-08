import { useState, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { errorToast } from "../helper/helperToast";
import { ErrorComponent } from "./helperComponents";
import StdNavbar from "./navbar";
import AdminSidebar from "./adminSidebar";
import GetToken from "../helper/authtoken";

const PrivateRoute = ({ children, allowedRole }: { children: JSX.Element; allowedRole: "admin" | "student"; }) => {
    const role = localStorage.getItem("role");
    const token = GetToken()
    if (!token) {
        errorToast("You Are Not Logged In.Please Log In First", 'not-login')

        return <Navigate to="/login" replace />
    }

    if (role !== allowedRole) {
        errorToast('Forbidden: You Do Not Have The Required Permission.', 'forbidden')

        return <ErrorComponent error="Forbidden: You Do Not Have The Required Permission" />
    }


    const [collapsed, setCollapsed] = useState(false);

    if (role === "admin") {
        return (

            <div className="d-flex">
                <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
                <div className="px-md-5"
                    style={{
                        flex: 1, marginLeft: collapsed ? "55px" : "250px",
                        transition: "margin 0.3s ease-in-out",
                    }}>
                    {children}
                </div>
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
