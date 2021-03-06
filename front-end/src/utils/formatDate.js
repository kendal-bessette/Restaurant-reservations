export const formatDate = (date) => {
  const months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const month = months[Number(date.slice(5, 7))];
  const day = Number(date.slice(8, 10));
  const year = Number(date.slice(0, 4));

  return `${month} ${day}, ${year}`;
};