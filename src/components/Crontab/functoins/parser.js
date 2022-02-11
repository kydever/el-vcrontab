const parse = function (crontab) {
  const crontabArray = crontab.split(" ");
  const crontabObject = {};
  crontabObject.minute = crontabArray[0];
  crontabObject.hour = crontabArray[1];
  crontabObject.dayOfMonth = crontabArray[2];
  crontabObject.month = crontabArray[3];
  crontabObject.dayOfWeek = crontabArray[4];
  return crontabObject;
};

const parseToString = function (obj) {
  return `${obj.minute} ${obj.hour} ${obj.dayOfMonth} ${obj.month} ${obj.dayOfWeek}`;
};

export { parse, parseToString };
