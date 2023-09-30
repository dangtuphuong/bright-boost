const tutors = ["Tutor A", "Tutor B", "Tutor C", "Tutor D", "Tutor E"];

const students = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    isAttended: true,
  },
  {
    id: 2,
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    isAttended: false,
  },
  {
    id: 3,
    name: "Michael Davis",
    email: "michael.davis@example.com",
    isAttended: true,
  },
  {
    id: 4,
    name: "Sophia Brown",
    email: "sophia.brown@example.com",
    isAttended: false,
  },
  {
    id: 5,
    name: "William Lee",
    email: "william.lee@example.com",
    isAttended: false,
  },
  {
    id: 6,
    name: "Olivia Wilson",
    email: "olivia.wilson@example.com",
    isAttended: true,
  },
  {
    id: 7,
    name: "James Martinez",
    email: "james.martinez@example.com",
    isAttended: false,
  },
  {
    id: 8,
    name: "Emma Taylor",
    email: "emma.taylor@example.com",
    isAttended: true,
  },
  {
    id: 9,
    name: "Daniel Anderson",
    email: "daniel.anderson@example.com",
    isAttended: false,
  },
  {
    id: 10,
    name: "Ava Jackson",
    email: "ava.jackson@example.com",
    isAttended: true,
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

export { students, questions };
