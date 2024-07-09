export const getDateMonth = (dateString: string): string => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dateParts = dateString.split("-");
  const month = parseInt(dateParts[1], 10) - 1;
  const day = parseInt(dateParts[2], 10);

  return `${day} ${months[month]}`;
};

export const getFormattedDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const calculateDaysBetween = (
  startDate: string,
  endDate: string
): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const differenceInTime = end.getTime() - start.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return Math.ceil(differenceInDays);
};
