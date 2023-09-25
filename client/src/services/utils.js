export const ICONS = [
  "percent",
  "science",
  "eco",
  "timeline",
  "biotech",
  "architecture",
  "functions",
  "edit",
  "brush",
];

export const COLORS = [
  "71C9CE",
  "8785A2",
  "F38181",
  "F67280",
  "FCE38A",
  "B4846C",
  "FFD9B7",
  "DFCCFB",
  "AEC3AE",
];

export const pluralize = (list) =>
  list?.length
    ? list.slice(0, list?.length - 1).join(", ") +
      " and " +
      list[list?.length - 1]
    : "";
