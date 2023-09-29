import moment from "moment";

function pickRandomItems(list) {
  const numberOfItems = Math.floor(Math.random() * 2) + 2; // Generates either 2 or 3
  const selectedItems = [];
  while (selectedItems.length < numberOfItems) {
    const randomIndex = Math.floor(Math.random() * list.length);
    const randomItem = list[randomIndex];
    if (!selectedItems.includes(randomItem)) {
      selectedItems.push(randomItem);
    }
  }
  return selectedItems;
}

const tutors = ["Tutor A", "Tutor B", "Tutor C", "Tutor D", "Tutor E"];

function generateFakeTimetable() {
  const daysOfWeek = [
    moment().startOf("isoweek"),
    moment().startOf("isoweek").add(1, "d"),
    moment().startOf("isoweek").add(2, "d"),
    moment().startOf("isoweek").add(3, "d"),
    moment().startOf("isoweek").add(4, "d"),
  ];

  const subjects = [
    "Math",
    "Science",
    "History",
    "Programming",
    "Economic",
    "Chemistry",
  ];

  const timetable = [];

  daysOfWeek.forEach((day) => {
    timetable.push({
      id: day.format("DD"),
      day,
      tutors: pickRandomItems(tutors)?.map((t) => ({
        name: t,
        subjects: pickRandomItems(subjects),
      })),
      count: Math.random() * 100,
    });
  });

  return timetable;
}

const timetable = generateFakeTimetable();

const students = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
  },
  {
    id: 2,
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
  },
  {
    id: 3,
    name: "Michael Davis",
    email: "michael.davis@example.com",
  },
  {
    id: 4,
    name: "Sophia Brown",
    email: "sophia.brown@example.com",
  },
  {
    id: 5,
    name: "William Lee",
    email: "william.lee@example.com",
  },
  {
    id: 6,
    name: "Olivia Wilson",
    email: "olivia.wilson@example.com",
  },
  {
    id: 7,
    name: "James Martinez",
    email: "james.martinez@example.com",
  },
  {
    id: 8,
    name: "Emma Taylor",
    email: "emma.taylor@example.com",
  },
  {
    id: 9,
    name: "Daniel Anderson",
    email: "daniel.anderson@example.com",
  },
  {
    id: 10,
    name: "Ava Jackson",
    email: "ava.jackson@example.com",
  },
];

const questions = students.map((student) => {
  const isAnswered = Math.random() < 0.5;
  return {
    id: student.id,
    content: `Question from ${student.name}: What is the answer?`,
    studentName: student.name,
    isAnswered,
    tutorName: isAnswered
      ? tutors[Math.floor(Math.random() * tutors.length)]
      : null,
  };
});

export { timetable, students, questions };
