import { useEffect, useState } from "react";
import DataService from "../services/data-service";

const AdminStudentPage = () => {
    const [attendant, setAttendant] = useState([]);

    useEffect(() => {
        DataService.getAttendant()
        .then(response => setAttendant(response.data));
    });

    const convertUnixTime = unixTime => {
        const date = new Date(unixTime);

        const year = date.getFullYear();
        const month = `0${date.getMonth() + 1}`.slice(-2); // Months are zero-based
        const day = `0${date.getDate()}`.slice(-2);
        const hours = `0${date.getHours()}`.slice(-2);
        const minutes = `0${date.getMinutes()}`.slice(-2);
        const seconds = `0${date.getSeconds()}`.slice(-2);
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="w-75">
                <h2 className="font-bg">Students Attendant</h2>
                <table className="table w-full">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Student ID</th>
                        <th scope="col">Session ID</th>
                        <th scope="col">Time Attend</th>
                        </tr>
                    </thead>
                    <tbody>
                        { attendant.length > 0 &&
                            attendant.map((_attendant, i) => 
                                <tr key={i}>
                                    <td>{_attendant.id}</td>
                                    <td>{_attendant.studentId}</td>
                                    <td>{_attendant.sessionId}</td>
                                    <td>{convertUnixTime(_attendant.time_attend)}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminStudentPage;