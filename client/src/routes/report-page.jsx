import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import AdminStudentPage from "./admin-student-page";
import AdminQuestionPage from "./admin-question-page";
import NavBar from "../components/NavBar";

const ReportPage = () => {
  const [tab, setTab] = useState("students");

  return (
    <NavBar>
      <div className="container">
        <div>
          <h2 className="mb-4 mt-2">Report</h2>
          <Tabs
            onSelect={setTab}
            defaultActiveKey={tab}
            className="mb-3"
            justify
          >
            <Tab eventKey="students" title="Students">
              <AdminStudentPage />
            </Tab>
            <Tab eventKey="questions" title="Questions">
              <AdminQuestionPage />
            </Tab>
          </Tabs>
        </div>
      </div>
    </NavBar>
  );
};

export default ReportPage;
