export function convertUnix(unixTimestamp: number) {
  var date = new Date(unixTimestamp * 1000);
  var hours = date.getHours();
  var formattedTime: string;
  hours == 0
    ? (formattedTime = "12am")
    : hours > 12
    ? (formattedTime = hours - 12 + "pm")
    : (formattedTime = hours + "am");
  return formattedTime;
}

export function convertUnixToDayOfWeek(unixTimestamp: number): string {
  var date = new Date(unixTimestamp * 1000);
  var dayOfWeek = date.getUTCDay();
  switch (dayOfWeek) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
    default:
      return "N/A";
  }
}
