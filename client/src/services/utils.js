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
  "ee6055",
  "60d394",
  "ffd97d",
  "5aa9e6",
  "957fef",
  "ffee93",
  "ff9b85",
  "70d6ff",
  "ff9770",
];

export const getRandomInt = (max) => Math.floor(Math.random() * max);

export const pluralize = (list) =>
  list?.length > 1
    ? list.slice(0, list?.length - 1).join(", ") +
      " and " +
      list[list?.length - 1]
    : list;

export const isEmpty = (data) => !data?.length;
