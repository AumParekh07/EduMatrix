import { Menu, Layers, Book, University, PlusCircle, LogOut, BookOpen, } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { LogoutHandle } from "../helper/SubmitHendle";
import './adminSidebar.css'
const menuItems = [
    { label: "Streams", path: "/admin/stream", icon: <Layers size={20} /> },
    { label: "Create Stream", path: "/admin/create-stream", icon: <PlusCircle size={20} /> },
    { label: "Subjects", path: "/admin/subject", icon: <BookOpen size={20} /> },
    { label: "Create Subject", path: "/admin/create-subject", icon: <PlusCircle size={20} /> },
    { label: "Courses", path: "/admin/course", icon: <Book size={20} /> },
    { label: "Create Course", path: "/admin/create-course", icon: <PlusCircle size={20} /> },
    { label: "Universities", path: "/admin/university", icon: <University size={20} /> },
    { label: "Create University", path: "/admin/create-university", icon: <PlusCircle size={20} /> },
];

function AdminSidebar({ collapsed, setCollapsed }: { collapsed: boolean; setCollapsed: (val: boolean) => void; }) {
    const location = useLocation();

    return (

        <div
            className="border-end shadow-sm position-fixed h-100"
            style={{
                width: collapsed ? "55px" : "250px",
                backgroundColor: "#f8f9fa",
                transition: "width 0.3s ease",
                zIndex: 1000,
            }}
        >
            <div className="d-flex align-items-center justify-content-between px-3 py-3 border-bottom">
                {!collapsed && <h4 className="mb-0 text-dark ">Admin</h4>}
                <Menu className="ms-1 text-dark" size={20} role="button" onClick={() => setCollapsed(!collapsed)} />
            </div>

            <ul className="list-unstyled mt-3 ">
                {menuItems.map((item) => (
                    <li key={item.label} className="">
                        <Link to={item.path}
                            className={`d-flex align-items-center px-3 py-2 rounded-4 text-decoration-none  ${location.pathname === item.path
                                ? " bg-primary text-light fw-bold"
                                : "text-dark lihover"}`}>
                            <span className={`${location.pathname === item.path ? 'text-light' : 'text-primary'}`}>{item.icon}</span>
                            {!collapsed && <span className="ms-2">{item.label}</span>}
                        </Link>
                    </li>
                ))}
                <li className="d-flex align-items-center px-3 py-2 rounded-4 text-decoration-none lihover" onClick={LogoutHandle} style={{ cursor: "pointer" }}>
                    <LogOut size={20} className="text-primary" />
                    {!collapsed && <span className="ms-2">Logout</span>}
                </li>
            </ul>
        </div>
    );
}

export default AdminSidebar