import { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import DataService from "../services/data-service";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

import "./table.scss";

const defaultFilterObj = {
  sessionFilter: "",
  studentFilter: "",
  studentNameFilter: "",
  dateFilter: "",
  markFilter: "",
};

const AdminStudentPage = () => {
  const [attendant, setAttendant] = useState([]);
  const [filterObj, setFilterObj] = useState(defaultFilterObj);

  useEffect(() => {
    DataService.getAttendant().then((response) => {
      setAttendant(response.data);
    });
  }, []);

  const filterData = useMemo(() => {
    const data = attendant?.filter((_attendant) => {
      if (
        _attendant?.sessionId
          .toString()
          .includes(filterObj?.sessionFilter.trim()) &&
        _attendant?.studentId
          .toString()
          .includes(filterObj?.studentFilter.trim()) &&
        _attendant?.student?.name
          .toString()
          ?.toLowerCase()
          .includes(filterObj?.studentNameFilter?.trim()?.toLowerCase()) &&
        (!filterObj.dateFilter ||
          moment(_attendant.time_attend).isSame(
            filterObj?.dateFilter,
            "day"
          )) &&
        _attendant.tutor_mark.toString().includes(filterObj.markFilter.trim())
      )
        return _attendant;
    });
    return data;
  }, [JSON.stringify({ filterObj, count: attendant?.length })]);

  const handleSessionFilterInputChange = (event) => {
    setFilterObj({ ...filterObj, sessionFilter: event?.target?.value });
  };

  const handleStudentFilterInputChange = (event) => {
    setFilterObj({ ...filterObj, studentFilter: event?.target?.value });
  };

  const handleStudentNameFilterInputChange = (event) => {
    setFilterObj({ ...filterObj, studentNameFilter: event?.target?.value });
  };

  const handleDateFilterInputChange = (date) => {
    setFilterObj({ ...filterObj, dateFilter: date });
  };

  const handleMarkFilterInputChange = (event) => {
    setFilterObj({ ...filterObj, markFilter: event?.target?.value });
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="w-100">
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
                  Student ID
                  <input
                    type="text"
                    className="form-control filter-item"
                    placeholder="Student ID"
                    value={filterObj?.studentFilter}
                    onChange={handleStudentFilterInputChange}
                  />
                </div>
              </th>
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
                  Session ID
                  <input
                    type="text"
                    className="form-control filter-item"
                    placeholder="Session ID"
                    value={filterObj?.sessionFilter}
                    onChange={handleSessionFilterInputChange}
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
                  Attended?
                  <Form.Select
                    className="filter-item"
                    value={filterObj?.markFilter}
                    onChange={handleMarkFilterInputChange}
                  >
                    <option value="">All</option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </Form.Select>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {filterData?.length > 0 ? (
              filterData.map((_attendant, i) => (
                <tr key={i}>
                  <td className="text-center">{_attendant?.studentId}</td>
                  <td className="text-center">{_attendant?.student?.name}</td>
                  <td className="text-center">{_attendant?.sessionId}</td>
                  <td className="text-center">
                    {moment(_attendant?.time_attend).format("dddd, DD-MM-YYYY")}
                  </td>
                  <td className="text-center">
                    {_attendant?.tutor_mark === 1 ? "Yes" : "No"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center" colSpan="5">
                  No result found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default AdminStudentPage;
