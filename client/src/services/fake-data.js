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

function generateFakeTimetable() {
  const daysOfWeek = [
    moment().startOf("isoweek"),
    moment().startOf("isoweek").add(1, "d"),
    moment().startOf("isoweek").add(2, "d"),
    moment().startOf("isoweek").add(3, "d"),
    moment().startOf("isoweek").add(4, "d"),
  ];
  const tutors = ["Tutor A", "Tutor B", "Tutor C", "Tutor D", "Tutor E"];
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
    });
  });

  return timetable;
}

const timetable = generateFakeTimetable();

export { timetable };
