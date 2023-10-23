import { useEffect, useReducer, useState } from "react";
import DatePicker from "react-datepicker";
import DataService from "../services/data-service";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const AdminStudentPage = () => {
    const [attendant, setAttendant] = useState([]);
    const [date, setDate] = useState(null);
    const filterReducer = (state, action) => {
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
            case 'SET SESSION FILTER':
                return {
                    ...state,
                    sessionFilter: action.session
                }
            case 'SET STUDENT FILTER':
                return {
                    ...state,
                    studentFilter: action.student
                }
            case 'SET DATE FILTER':
                return {
                    ...state,
                    dateFilter: action.date,
                    isDateFilter: true
                }
            case 'SET MARK FILTER':
                return {
                    ...state,
                    markFilter: action.mark
                }
            case 'RESET DATE FILTER':
                return {
                    ...state,
                    isDateFilter: false
                }
        }
    }    

    const [filter, filterDispatch] = useReducer(filterReducer, {attendant: [], isFiltered: false, sessionFilter: '', studentFilter: '', dateFilter: 0, isDateFilter: false, markFilter: ''});

    useEffect(() => {
        DataService.getAttendant()
        .then(response => {
            setAttendant(response.data);
            filterData();
        });
    });

    const filterData = () => {
        const data = attendant.filter(_attendant => {
            if (_attendant.sessionId.toString().includes(filter.sessionFilter.trim())
                && _attendant.studentId.toString().includes(filter.studentFilter.trim())
                && (!filter.isDateFilter || (_attendant.time_attend / 1000 >= filter.dateFilter - 43200 && _attendant.time_attend / 1000 <= filter.dateFilter + 43200 ))
                && _attendant.tutor_mark.toString().includes(filter.markFilter.trim())) return _attendant;
        });
        filterDispatch({type: 'SET ATTENDANT', attendant: data})
    }

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
        filterDispatch({type: 'SET SESSION FILTER', session: event.target.value});
    }

    const handleStudentFilterInputChange = (event) => {
        filterDispatch({type: 'SET STUDENT FILTER', student: event.target.value});
    }

    const handleDateFilterInputChange = (date) => {
        setDate(date);
        const _date = new Date(moment(date).format('YYYY-MM-DD'));
        const unixTime = _date.getTime() / 1000;
        filterDispatch({type: 'SET DATE FILTER', date: unixTime});
    }

    const handleMarkFilterInputChange = (event) => {
        filterDispatch({type: 'SET MARK FILTER', mark: event.target.value});
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="w-75">
                <h2 className="font-bg">Students Attendant</h2>
                <div className="d-flex justify-content-end">
                    <button type="button" onClick={() => filterDispatch({type: 'FILTER', state: !filter.isFiltered})} className={`btn border ${!filter.isFiltered ? 'bg-light text-primary' : 'bg-primary text-light'}`}>Filter</button>
                </div>
                <div className={`${!filter.isFiltered ? 'd-none' : ''} py-1`}>
                    <div className="d-flex border rounded px-2 py-3">
                        <div className={`w-25`}>
                            <div
                                className={`btn border bg-primary text-light`}
                            >Session ID</div>
                            <div className="w-50 border rounded px-2 py-2 m-0">
                                <input
                                    type="text"
                                    className="form-control m-0"
                                    placeholder="Session ID"
                                    aria-label="Session"
                                    aria-describedby="basic-addon1"
                                    onChange={handleSessionFilterInputChange}
                                />
                            </div>
                        </div>
                        <div className={`w-25`}>
                            <div
                                className={`btn border bg-primary text-light`}
                            >Student ID</div>
                            <div className="w-50 border rounded px-2 py-2 m-0">
                                <input
                                    type="text"
                                    className="form-control m-0"
                                    placeholder="Student ID"
                                    aria-label="Student"
                                    aria-describedby="basic-addon1"
                                    onChange={handleStudentFilterInputChange}
                                />
                            </div>
                        </div>
                        <div className={`w-25`}>
                            <div
                                className={`btn border bg-primary text-light`}
                            >Date</div>
                            <div className="w-75 d-flex align-items-center justify-content-between border rounded px-2 py-2 m-0">
                                <DatePicker
                                    selected={date}
                                    onChange={date => handleDateFilterInputChange(date)}
                                    className={`w-75`}
                                />
                                <button className={`btn rounded p-0`} onClick={() => { filterDispatch({type: 'RESET DATE FILTER'});setDate(null); }}>Reset</button>
                            </div>
                        </div>
                        <div className={`w-25`}>
                            <div
                                className={`btn border bg-primary text-light`}
                            >Marked</div>
                            <div className="w-50 border rounded px-2 py-2 m-0">
                                <select
                                    onChange={handleMarkFilterInputChange}
                                    className={`w-75`}
                                >
                                    <option value={""}>All --</option>
                                    <option value={"1"}>YES</option>
                                    <option value={"0"}>NO</option>
                                </select>
                            </div>
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