import { Link } from "react-router-dom"
import { BackButton } from "./helperComponents";

function PageNotFound({ h = true }: { h?: boolean }) {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: `${h ? '100vh' : "calc(100vh -72px)"}` }}>
            <div className="border border-3 rounded-3 border-danger bg-white bg-opacity-50 p-4 text-center">
                <h1 className="fw-bold  p-1" style={{ color: "red" }}>
                    404: PAGE NOT FOUND
                </h1>
                <div className="d-flex justify-content-center ">
                    <Link to="/" className="btn btn-primary m-2">HOME </Link>
                    <BackButton />
                </div>
            </div>
        </div >
    );
}
export default PageNotFound;