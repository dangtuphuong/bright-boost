import { useState, useEffect, useMemo } from "react";
import DataService from "../services/data-service";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import moment from "moment";

import "./Charts.scss";

Chart.register(CategoryScale);

const colors = ["#FFB6C1", "#ADD8E6", "#77DD77", "#FFD700", "#9370DB"];

const labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const Charts = () => {
  const [attendants, setAttendants] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    DataService.getAttendant().then((response) => {
      setAttendants(
        response?.data
          ?.filter(({ tutor_mark }) => tutor_mark)
          ?.reduce(
            (results, current) => ({
              ...results,
              [current.session.date]:
                results[current.session.date] > 0
                  ? results[current.session.date] + 1
                  : 1,
            }),
            {}
          )
      );
    });
    DataService.getAllQuestion().then((response) => {
      setQuestions(
        response?.data
          ?.filter(({ is_answered }) => is_answered)
          ?.map((i) => ({
            ...(i || {}),
            time_publish: moment(i.time_publish).format("dddd"),
          }))
      );
    });
  }, []);

  const attendanceData = useMemo(
    () => ({
      labels: Object.keys(attendants),
      datasets: [
        {
          label: "Total Students",
          data: Object.values(attendants),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    }),
    [attendants?.length]
  );

  const questionsData = useMemo(
    () => ({
      labels: labels,
      datasets: Array.from(
        new Set(questions.map((session) => session.subject.name)).values()
      ).map((subject, i) => ({
        label: subject,
        data: labels.map(
          (label) =>
            questions.filter(
              (session) =>
                session.time_publish === label &&
                session.subject.name === subject
            ).length
        ),
        backgroundColor: colors[i],
      })),
    }),
    [questions?.length, labels?.length]
  );

  return (
    <div className={`w-100`}>
      <div className="d-flex justify-content-between">
        <div className="w-50 chart-left">
          <h4 className="mt-4">Weekly Attendance</h4>
          <Line
            data={attendanceData}
            options={{
              plugins: { legend: { display: false } },
              scales: { y: { min: 0, ticks: { stepSize: 1 } } },
            }}
          />
        </div>
        <div className="w-50 chart-right">
          <h4 className="mt-4 mb-4">Weekly Questions Breakdown</h4>
          <Bar
            data={questionsData}
            options={{
              plugins: { legend: { display: false } },
              scales: {
                x: { stacked: true },
                y: { min: 0, ticks: { stepSize: 1 }, stacked: true },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Charts;
