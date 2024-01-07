import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(tz);

const checkTimeIsExpired = (timeArg) => {
  const currentTime = Date.now();
  const time = new Date(timeArg).getTime() - +process.env.TIME_BUFFER;
  return time < currentTime;
};

const calculateRemainingTime = (timeArg) => {
  const currentTime = Date.now();
  const time = new Date(timeArg).getTime() - +process.env.TIME_BUFFER;
  const remainingTime = time - currentTime;
  return remainingTime;
};

const formatISTTime = (time) => {
  return dayjs(time).tz('Asia/Calcutta').format('DD/MM/YYYY, h:mm A');
};

const formatISTDate = (time) => {
  return dayjs(time).tz('Asia/Calcutta').format('MM/DD/YYYY');
};

export {
  checkTimeIsExpired,
  calculateRemainingTime,
  formatISTTime,
  formatISTDate,
};
