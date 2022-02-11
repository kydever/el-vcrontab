import Cron from "croner";

const generateInterval = (s = 0, e = 59) => {
  if (typeof s !== "number" || typeof e !== "number") return [];
  return new Array(e - s + 1)
    .fill(0)
    .map((t, i) => ({ label: i + s, value: i + s }));
};

function padZero(str = "", num = 2) {
  return `${str}`.padStart(num, 0);
}

const formatTime = (time, formats = "YYYY-MM-DD HH:mm:ss") => {
  if (!time) {
    return "";
  }

  const date = new Date(time);
  const temp = {
    YYYY: date.getFullYear(),
    MM: date.getMonth() + 1,
    DD: date.getDate(),
    HH: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds(),
  };

  for (let key in temp) {
    formats = formats.replace(key, padZero(temp[key]));
  }

  return formats;
};

const validateCrontab = (crontab) => {
  let crontabList = crontab.split(" ");
  if (crontabList.length !== 5) return false;
  let reg =
    /^\*|\b\d{1,2}-\d{1,2}\b|\b\d{1,2}\/\d{1,2}\b|\b\d{1,2}(,\d{1,2}){0,}\b$/;
  let result = crontabList.filter((crontab) => reg.test(crontab) === false);
  return result.length === 0;
};

const parserCronToDate = (crontab) => {
  if (!validateCrontab(crontab)) return [];
  return new Cron(crontab)
    .enumerate(5)
    .map((time) => formatTime(time.getTime()));
};

export { generateInterval, parserCronToDate, validateCrontab };
