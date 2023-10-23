import { useState } from "react";
import AdminNavBar from "../components/AdminNavBar";
import AdminStudentPage from "./admin-student-page";
import AdminQuestionPage from './admin-question-page';

const AdminPage = () => {
    const [service, setService] = useState("Student");
    return (
        <div>
            <AdminNavBar setService={setService}/>
            { service === "Student" 
                ? <AdminStudentPage /> 
                : <AdminQuestionPage />
            }
        </div>
    )
}

export default AdminPage;
