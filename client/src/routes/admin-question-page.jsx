import { useEffect, useMemo, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import DataService from "../services/data-service";
import DatePicker from "react-datepicker";
import moment from "moment/moment";

import "./table.scss";

const defaultFilterObj = {
  studentNameFilter: "",
  subjectFilter: "",
  isAnswered: "",
  tutorNameFilter: "",
  content: "",
  dateFilter: "",
};

const AdminQuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [filterObj, setFilterObj] = useState(defaultFilterObj);

  const filterData = useMemo(() => {
    const data = questions?.filter((_question) => {
      if (
        _question?.student?.name
          ?.toString()
          ?.toLowerCase()
          .includes(filterObj.studentNameFilter?.trim()?.toLowerCase()) &&
        _question?.content
          ?.toString()
          ?.toLowerCase()
          .includes(filterObj.content?.trim()?.toLowerCase()) &&
        _question.subject.name
          .toString()
          ?.toLowerCase()
          .includes(filterObj.subjectFilter.trim()?.toLowerCase()) &&
        _question.is_answered
          .toString()
          .includes(filterObj.isAnswered.trim()) &&
        (_question?.tutor || filterObj.tutorNameFilter?.trim()
          ? _question?.tutor?.name
              ?.toString()
              ?.toLowerCase()
              .includes(filterObj.tutorNameFilter?.trim()?.toLowerCase())
          : true) &&
        (!filterObj.dateFilter ||
          moment(_question.time_publish).isSame(filterObj?.dateFilter, "day"))
      )
        return _question;
    });
    return data;
  }, [JSON.stringify({ filterObj, count: questions?.length })]);

  useEffect(() => {
    DataService.getAllQuestion().then((response) => {
      setQuestions(
        response?.data?.map((i) => ({
          ...(i || {}),
          is_answered: i?.is_answered > 0 ? 1 : 0,
        }))
      );
    });
  }, []);

  const handleStudentNameFilterInputChange = (event) => {
    setFilterObj({ ...filterObj, studentNameFilter: event?.target?.value });
  };

  const handleSubjectFilterInputChange = (event) => {
    setFilterObj({ ...filterObj, subjectFilter: event?.target?.value });
  };

  const handleAnsweredFilterInputChange = (event) => {
    setFilterObj({ ...filterObj, isAnswered: event?.target?.value });
  };

  const handleTutorNameFilterInputChange = (event) => {
    setFilterObj({ ...filterObj, tutorNameFilter: event?.target?.value });
  };

  const handleContentFilterInputChange = (event) => {
    setFilterObj({ ...filterObj, content: event?.target?.value });
  };

  const handleDateFilterInputChange = (date) => {
    setFilterObj({ ...filterObj, dateFilter: date });
  };

  return (
    <div className={`d-flex justify-content-center`}>
      <div className={`w-100`}>
        <div className="d-flex justify-content-between">
          <span>
            Total <strong>{filterData?.length || 0}</strong> records
          </span>
          <Button variant="link" onClick={() => setFilterObj(defaultFilterObj)}>
            Reset Filters
          </Button>
        </div>

        <Table striped bordered>
          <thead>
            <tr>
              <th scope="col">
                <div className="header-cell">
                  Student Name
                  <input
                    type="text"
                    className="form-control filter-item"
                    placeholder="Student Name"
                    value={filterObj?.studentNameFilter}
                    onChange={handleStudentNameFilterInputChange}
                  />
                </div>
              </th>
              <th scope="col">
                <div className="header-cell">
                  Subject
                  <input
                    type="text"
                    className="form-control filter-item"
                    placeholder="Subject"
                    value={filterObj?.subjectFilter}
                    onChange={handleSubjectFilterInputChange}
                  />
                </div>
              </th>
              <th scope="col">
                <div className="header-cell">
                  Content
                  <input
                    type="text"
                    className="form-control filter-item"
                    placeholder="Content"
                    value={filterObj?.content}
                    onChange={handleContentFilterInputChange}
                  />
                </div>
              </th>
              <th scope="col">
                <div className="header-cell">
                  Session
                  <div className="filter-item">
                    <DatePicker
                      className="form-control"
                      placeholderText="Date"
                      selected={filterObj?.dateFilter}
                      onChange={(date) => handleDateFilterInputChange(date)}
                    />
                  </div>
                </div>
              </th>
              <th scope="col">
                <div className="header-cell">
                  Answered?
                  <Form.Select
                    className="filter-item"
                    value={filterObj?.isAnswered}
                    onChange={handleAnsweredFilterInputChange}
                  >
                    <option value="">All</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </Form.Select>
                </div>
              </th>
              <th scope="col">
                <div className="header-cell">
                  Tutor Name
                  <input
                    type="text"
                    className="form-control filter-item"
                    placeholder="Tutor Name"
                    value={filterObj?.tutorFilter}
                    onChange={handleTutorNameFilterInputChange}
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filterData.length > 0 &&
              filterData.map((_question, i) => (
                <tr key={i}>
                  <td>{_question.student.name}</td>
                  <td>{_question.subject.name}</td>
                  <td>{_question.content}</td>
                  <td>
                    {moment(_question.time_publish).format("dddd, DD-MM-YYYY")}
                  </td>
                  <td>{_question.is_answered === 1 ? "Yes" : "No"}</td>
                  <td>
                    {_question.tutor !== null ? _question.tutor.name : ""}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AdminQuestionPage;
