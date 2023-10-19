import { useState } from "react";
import AdminNavBar from "../components/AdminNavBar";
import AdminStudentPage from "./admin-student-page";

const AdminPage = () => {
    const [service, setService] = useState("Student");
    return (
        <div>
            <AdminNavBar setService={setService}/>
            { service === "Student" 
                ? <AdminStudentPage /> 
                : null}
        </div>
    )
}

export default AdminPage;
