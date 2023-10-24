import { useState, useEffect, useMemo } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import StudentTable from "../components/StudentTable";
import QuestionTable from "../components/QuestionTable";
import Charts from "../components/Charts";
import NavBar from "../components/NavBar";

const ReportPage = () => {
  const [tab, setTab] = useState("students");

  return (
    <NavBar>
      <div className="container">
        <div>
          <h2 className="mb-4 mt-4">Report</h2>
          <Tabs
            onSelect={setTab}
            defaultActiveKey={tab}
            className="mb-3"
            justify
          >
            <Tab eventKey="students" title="Students">
              <StudentTable />
            </Tab>
            <Tab eventKey="questions" title="Questions">
              <QuestionTable />
            </Tab>
            <Tab eventKey="charts" title="Charts">
              <Charts />
            </Tab>
          </Tabs>
        </div>
      </div>
    </NavBar>
  );
};

export default ReportPage;
