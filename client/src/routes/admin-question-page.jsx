import { useEffect, useReducer, useState } from 'react';
import DataService from '../services/data-service';
import DatePicker from 'react-datepicker';
import moment from 'moment/moment';

const AdminQuestionPage = () => {
    const [question, setQuestion] = useState([]);
    const [date, setDate] = useState(null);

    const filterReducer = (state, action) => {
        switch (action.type) {
            case 'SET QUESTION': {
                return {
                    ...state,
                    question: action.question
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
            case 'SET SUBJECT FILTER':
                return {
                    ...state,
                    subjectFilter: action.subject
                }
            case 'SET ISANSWERED FILTER':
                return {
                    ...state,
                    isAnswered: action.is_answered
                }
            case 'SET TUTOR FILTER':
                return {
                    ...state,
                    tutorFilter: action.tutor
                }
            case 'SET DATE FILTER':
                return {
                    ...state,
                    dateFilter: action.date,
                    isDateFilter: true
                }
            case 'RESET DATE FILTER':
                return {
                    ...state,
                    isDateFilter: false
                }
        }
    }

    const [filter, filterDispatch] = useReducer(filterReducer, {question: [], isFiltered: false, sessionFilter: '', studentFilter: '', subjectFilter: '', isAnswered: -1, tutorFilter: '', dateFilter: 0, isDateFilter: false });

    const filterData = () => {
        const data = question.filter(_question => {
            if (_question.sessionId.toString().includes(filter.sessionFilter.trim())
                && _question.studentId.toString().includes(filter.studentFilter.trim())
                && _question.subject.name.toString().includes(filter.subjectFilter.trim())
                && (filter.isAnswered < 0 || _question.is_answered.toString() === filter.isAnswered.trim())
                && (filter.isAnswered <= 0 || (_question.tutorId !== null &&  _question.tutorId.toString().includes(filter.tutorFilter.trim())))
                && (!filter.isDateFilter || (_question.time_publish / 1000 >= filter.dateFilter - 43200 && _question.time_publish / 1000 <= filter.dateFilter + 43200 ))) return _question;
        })
        filterDispatch({type: 'SET QUESTION', question: data});
    }

    useEffect(() => {
        DataService.getAllQuestion()
            .then(response => {
                setQuestion(response.data);
                filterData();
            });
    });

    const handleSessionFilterInputChange = (event) => {
        filterDispatch({type: 'SET SESSION FILTER', session: event.target.value});
    }

    const handleStudentFilterInputChange = (event) => {
        filterDispatch({type: 'SET STUDENT FILTER', student: event.target.value});
    }

    const handleSubjectFilterInputChange = (event) => {
        filterDispatch({type: 'SET SUBJECT FILTER', subject: event.target.value});
    }

    const handleAnsweredFilterInputChange = (event) => {
        filterDispatch({type: 'SET TUTOR FILTER', tutor: ''});
        filterDispatch({type: 'SET ISANSWERED FILTER', is_answered: event.target.value})
    }

    const handleTutorFilterInputChange = (event) => {
        filterDispatch({type: 'SET TUTOR FILTER', tutor: event.target.value})
    }

    const handleDateFilterInputChange = (date) => {
        setDate(date);
        const _date = new Date(moment(date).format('YYYY-MM-DD'));
        const unixTime = _date.getTime() / 1000;
        filterDispatch({type: 'SET DATE FILTER', date: unixTime});
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

    return (
        <div className={`d-flex justify-content-center`}>
            <div className={`w-75`}>
                <div className={`flex justify-content-start`}>
                    <h2 className="font-bg">Questions</h2>
                </div>
                <div className="d-flex justify-content-end">
                    <button type="button" onClick={() => filterDispatch({type: 'FILTER', state: !filter.isFiltered})} className={`btn border ${!filter.isFiltered ? 'bg-light text-primary' : 'bg-primary text-light'}`}>Filter</button>
                </div>
                <div className={`${!filter.isFiltered ? 'd-none' : ''} py-1`}>
                    <div className={"d-flex border rounded px-2 py-3"}>
                        <div className={``}>
                            <div
                                className={`btn border bg-primary text-light`}
                            >Session ID</div>
                            <div className="w-75 border rounded px-2 py-2 m-0">
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
                        <div className={``}>
                            <div
                                className={`btn border bg-primary text-light`}
                            >Student ID</div>
                            <div className="w-75 border rounded px-2 py-2 m-0">
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
                        <div className={``}>
                            <div
                                className={`btn border bg-primary text-light`}
                            >Subject</div>
                            <div className="w-75 border rounded px-2 py-2 m-0">
                                <input
                                    type="text"
                                    className="form-control m-0"
                                    placeholder="Subject"
                                    aria-label="Student"
                                    aria-describedby="basic-addon1"
                                    onChange={handleSubjectFilterInputChange}
                                />
                            </div>
                        </div>
                        <div className={``}>
                            <div
                                className={`btn border bg-primary text-light`}
                            >Is Answered?</div>
                            <div className="w-75 border rounded px-2 py-2 m-0">
                                <select
                                    onChange={handleAnsweredFilterInputChange}
                                    className={`w-75`}
                                >
                                    <option value={-1}>All --</option>
                                    <option value={2}>YES</option>
                                    <option value={1}>IS ANSWERING</option>
                                    <option value={0}>NO</option>
                                </select>
                            </div>
                        </div>
                        { filter.isAnswered >= 1 &&
                            <div className={``}>
                                <div
                                    className={`btn border bg-primary text-light`}
                                >Tutor ID</div>
                                <div className="w-75 border rounded px-2 py-2 m-0">
                                    <input
                                        type="text"
                                        className="form-control m-0"
                                        placeholder="Tutor Id"
                                        aria-label="Tutor"
                                        aria-describedby="basic-addon1"
                                        onChange={handleTutorFilterInputChange}
                                    />
                                </div>
                            </div>
                        }
                        <div>
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
                    </div>
                </div>
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Student ID</th>
                        <th scope="col">Student Name</th>
                        <th scope="col">Subject</th>
                        <th scope="col">Content</th>
                        <th scope="col">Tutor ID</th>
                        <th scope="col">Tutor Name</th>
                        <th scope="col">Session ID</th>
                        <th scope="col">Is Answered</th>
                        <th scope="col">Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    { filter.question.length > 0 &&
                        filter.question.map((_question, i) =>
                            <tr key={i}>
                                <td>{i}</td>
                                <td>{_question.studentId}</td>
                                <td>{_question.student.name}</td>
                                <td>{_question.subject.name}</td>
                                <td>{_question.content}</td>
                                <td>{_question.tutor !== null ? _question.tutor.id : ''}</td>
                                <td>{_question.tutor !== null ? _question.tutor.name : ''}</td>
                                <td>{_question.sessionId}</td>
                                <td>{_question.is_answered === 0 ? 'NO' : _question.is_answered === 1 ? 'IS ANSWERING' : 'YES'}</td>
                                <td>{convertUnixTime(_question.time_publish)}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminQuestionPage;