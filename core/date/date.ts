const moment = require("moment");

export const date_time = (dateTimeString: string): string => {
  const parsedDate = moment(dateTimeString);

  if (!parsedDate.isValid()) return "Invalid Date Time";

  return parsedDate.format("DD/MM/YYYY HH:mm:ss");
};

export const date = (dateString: string): string => {
  const parsedDate = moment(dateString);

  if (!parsedDate.isValid()) return "Invalid Date";

  return parsedDate.format("DD/MM/YYYY");
};
