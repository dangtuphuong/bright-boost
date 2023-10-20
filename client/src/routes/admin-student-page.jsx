import { useEffect, useReducer, useState } from "react";
import DataService from "../services/data-service";

const AdminStudentPage = () => {
    const [isInit, setInit] = useState(false);
    const [attendant, setAttendant] = useState([]);
    const filterReducer = (state, action) => {
        console.log(action);
        switch (action.type) {
            case 'SET ATTENDANT': {
                return {
                    ...state,
                    attendant: action.attendant
                }
            }
            case 'FILTER': 
                return {
                    ...state,
                    isFiltered: action.state
                }
                break;
            case 'SESSION FILTER':
                return {
                    ...state,
                    isSessionFiltered: action.state
                }
        }
    }    

    const [filter, filterDispatch] = useReducer(filterReducer, {attendant: [], isFiltered: false, isSessionFiltered: false});

    useEffect(() => {
        DataService.getAttendant()
        .then(response => {
            if (!isInit) { 
                filterDispatch({type: 'SET ATTENDANT', attendant: response.data});
                setInit(true);
            } 
            setAttendant(response.data);
        });
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

    const handleSessionFilterInputChange = (event) => {
        const data = attendant.filter(_attendant => _attendant.sessionId == event.target.value);
        filterDispatch({type: 'SET ATTENDANT', attendant: data})
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="w-75">
                <h2 className="font-bg">Students Attendant</h2>
                <div className="d-flex justify-content-end">
                    <button type="button" onClick={() => filterDispatch({type: 'FILTER', state: !filter.isFiltered})} className={`btn border ${!filter.isFiltered ? 'bg-light text-primary' : 'bg-primary text-light'}`}>Filter</button>
                </div>
                <div className={`${filter.isFiltered ? 'd-none' : ''}`}>
                    <div className="d-flex justify-content-between">
                        <div>
                            <button 
                                className={`btn border ${!filter.isSessionFiltered ? 'bg-light text-primary' : 'bg-primary text-light'}`} 
                                onClick={() => filterDispatch({type: 'SESSION FILTER', state: !filter.isSessionFiltered})}
                            >Session ID</button>
                            { filter.isSessionFiltered &&
                                <div className="w-20 border rounded px-2 py-2">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1">Session ID</span>
                                        </div>
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Session ID" 
                                            aria-label="Username" 
                                            aria-describedby="basic-addon1"
                                            onChange={handleSessionFilterInputChange}
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Student ID</th>
                            <th scope="col">Student Name</th>
                            <th scope="col">Session ID</th>
                            <th scope="col">Time Attend</th>
                            <th scope="col">Tutor Mark</th>
                        </tr>
                    </thead>
                    <tbody>
                        { filter.attendant.length > 0 && 
                            filter.attendant.map((_attendant, i) => 
                                <tr key={i}>
                                    <td>{i}</td>
                                    <td>{_attendant.studentId}</td>
                                    <td>{_attendant.student.name}</td>
                                    <td>{_attendant.sessionId}</td>
                                    <td>{convertUnixTime(_attendant.time_attend)}</td>
                                    <td>{_attendant.tutor_mark === 1 ? "YES" : "NO"}</td>
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