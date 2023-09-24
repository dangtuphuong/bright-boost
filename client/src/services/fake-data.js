import moment from "moment";

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

  function pickRandomTutors() {
    const tutors = ["Tutor A", "Tutor B", "Tutor C", "Tutor D", "Tutor E"];
    const numberOfTutors = Math.floor(Math.random() * 2) + 2; // Generates either 2 or 3
    const selectedTutors = [];

    while (selectedTutors.length < numberOfTutors) {
      const randomIndex = Math.floor(Math.random() * tutors.length);
      const randomTutor = tutors[randomIndex];
      if (!selectedTutors.includes(randomTutor)) {
        selectedTutors.push(randomTutor);
      }
    }

    return selectedTutors;
  }

  const timetable = [];

  daysOfWeek.forEach((day) => {
    timetable.push({
      day,
      tutors: pickRandomTutors()?.map((t) => ({
        name: t,
        subjects: subjects.slice(Math.floor(Math.random() * 6)),
      })),
    });
  });

  return timetable;
}

const timetable = generateFakeTimetable();

export { timetable };
